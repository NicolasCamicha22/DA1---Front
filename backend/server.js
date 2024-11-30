
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const postmark = require('postmark');
const { Pool } = require('pg'); // Importa la librería 'pg' para PostgreSQL
// Genera el token JWT

const jwt = require('jsonwebtoken');
require('dotenv').config();

const fs = require('fs');
const path = require('path');
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
const uploadsDir = path.join(__dirname, 'uploads');


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Para parsear el JSON en las solicitudes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const upload = multer({
    dest: 'uploads/',
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype) {
            return cb(null, true);
        }
        cb(new Error('Solo se permiten imágenes'));
    }
});



// Inicializa el cliente de Postmark
const client = new postmark.ServerClient("61772881-19ef-4bc7-8ca9-b6bc9c80ba7b");

// Configura la conexión a PostgreSQL
const pool = new Pool({
    //user: 'postgres', // Usuario de PostgreSQL
    //host: 'localhost', // La IP del contenedor Docker o 'localhost' si estás trabajando en la misma máquina
    //database: 'da1', // El nombre de tu base de datos
    //password: 'mysecretpassword', // La contraseña de PostgreSQL que configuraste
    //port: 5432, // El puerto predeterminado de PostgreSQL

    user: 'nico',
    host: 'dpg-csj9j5btq21c73davnh0-a',
    database: 'da1',
    password: 'tCKvXQlASPXK8QqfjufYouyJGMLJ8BnF',
    port: 5432,

});

// Ruta para enviar código de recuperación
// Verificar si el correo está registrado y enviar código de recuperación
app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email es requerido' });
    }

    try {
        // Verificar si el email está registrado en la base de datos
        const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (userResult.rows.length === 0) {
            // Si no existe el usuario, devolver error sin enviar código
            return res.status(404).json({ message: 'Este correo no está registrado en la aplicación.' });
        }

        const recoveryCode = Math.floor(100000 + Math.random() * 900000); // Código de 6 dígitos

        // Actualizar el código de recuperación en la base de datos
        await pool.query('UPDATE users SET recovery_code = $1 WHERE email = $2', [recoveryCode, email]);

        // Enviar el correo con el código de recuperación
        await client.sendEmail({
            "From": "ncamicha@uade.edu.ar", // Cambia esto por tu correo verificado en Postmark
            "To": email,
            "Subject": "Código de recuperación de contraseña",
            "TextBody": `Tu código de recuperación es: ${recoveryCode}`
        });

        console.log(`Enviando código de recuperación a: ${email}`);
        res.status(200).json({ message: 'Código enviado a tu email. Por favor, revisa tu bandeja de entrada.' });
    } catch (error) {
        console.error('Error al enviar el correo o guardar el código:', error);
        res.status(500).json({ message: 'Error al enviar el código de recuperación' });
    }
});


// Ruta para restablecer la contraseña
app.post('/reset-password', async (req, res) => {
    const { email, code, newPassword } = req.body;

    if (!email || !code || !newPassword) {
        console.log('Campos incompletos recibidos en la solicitud:', { email, code, newPassword });
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    try {
        // Consulta el código de recuperación registrado en la base de datos para el email dado
        const result = await pool.query('SELECT recovery_code FROM users WHERE email = $1', [email]);
        console.log(`Resultado de consulta para email ${email}:`, result.rows);

        if (result.rows.length === 0) {
            console.log(`El email ${email} no está registrado en el sistema.`);
            return res.status(404).json({ message: 'El email no está registrado.' });
        }

        const dbCode = result.rows[0].recovery_code;  // Código guardado en la base de datos
        if (dbCode.toString().trim() !== code.toString().trim()) {
            console.log(`Código incorrecto para el email ${email}. Código recibido: ${code}, Código esperado: ${dbCode}`);
            return res.status(400).json({ message: 'Código inválido o expirado' });
        }



        // Actualiza la contraseña y resetea el código de recuperación
        await pool.query('UPDATE users SET password = $1, recovery_code = NULL WHERE email = $2', [newPassword, email]);

        console.log(`Contraseña cambiada exitosamente para el usuario: ${email}`);
        res.status(200).json({ message: 'Contraseña cambiada exitosamente' });
    } catch (error) {
        console.error('Error al restablecer la contraseña:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});




// Ruta para registrar un nuevo usuario

app.post('/register', async (req, res) => {
    const { name, surname, email, password, username, profilePic } = req.body;

    if (!name || !surname || !email || !password || !username) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    let profilePicPath = null;

    // Si la imagen de perfil está incluida
    if (profilePic) {
        // Elimina el prefijo base64 de la imagen
        const base64Data = profilePic.replace(/^data:image\/\w+;base64,/, "");

        // Genera un nombre único para la imagen
        const fileName = `${username}_profile_${Date.now()}.jpg`;
        const filePath = path.join(uploadsDir, fileName);

        try {
            // Guarda la imagen en el servidor
            await fs.promises.writeFile(filePath, base64Data, 'base64');
            profilePicPath = `/uploads/${fileName}`;  // Guarda solo la ruta relativa en la base de datos
        } catch (error) {
            console.error('Error al guardar la imagen:', error);
            return res.status(500).json({ message: 'Error al guardar la imagen' });
        }
    }

    try {
        // Inserta el nuevo usuario en la base de datos
        await pool.query(
            'INSERT INTO users (name, surname, email, password, username, profile_pic) VALUES ($1, $2, $3, $4, $5, $6)',
            [name, surname, email, password, username, profilePicPath]
        );

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});





//LOGIN TOKENS JWT
// Generar access token
// Acceso a las claves secretas desde las variables de entorno
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
let refreshTokens = [];

// Verificar que las claves estén definidas
if (!accessTokenSecret || !refreshTokenSecret) {
    console.error('Las claves secretas para los tokens JWT no están definidas');
}


// Iniciar sesión
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email y contraseña son requeridos' });
    }

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        const user = result.rows[0];

        if (user.password !== password) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Generar tokens
        const accessToken = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

        // Almacenar el refreshToken temporalmente
        refreshTokens.push(refreshToken);

        return res.status(200).json({ accessToken, refreshToken, userId: user.id });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Endpoint para refrescar tokens
app.post('/token', (req, res) => {
    const { token } = req.body;
    if (!token) return res.sendStatus(401);
    if (!refreshTokens.includes(token)) return res.sendStatus(403);

    jwt.verify(token, refreshTokenSecret, (err, user) => {
        if (err) return res.sendStatus(403);

        const accessToken = jwt.sign({ userId: user.id }, accessTokenSecret, { expiresIn: '15m' });
        res.json({ accessToken });
    });
});

// Endpoint para validar token
app.get('/validate-token', (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];  // 'Bearer <token>'

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, accessTokenSecret, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' });
        }

        res.json({ valid: true });
    });
});

// Endpoint para cerrar sesión
app.post('/logout', (req, res) => {
    const { token } = req.body;
    refreshTokens = refreshTokens.filter(t => t !== token);
    res.sendStatus(204);
});




// GET HOME
// Ruta para obtener las publicaciones de usuarios que sigue el usuario logueado
app.get('/posts', async (req, res) => {
    const { userId } = req.query;

    try {
        const postsQuery = `
            SELECT 
                p.id, 
                p.caption, 
                p.location, 
                p.description, 
                p.date,
                u.username,  
                array_agg(pi.image_url) AS images,
                -- Contamos los likes, favoritos y comentarios
                COUNT(DISTINCT l.post_id) AS likes_count,
                COUNT(DISTINCT fav.post_id) AS favorites_count,
                COUNT(DISTINCT c.id) AS comments_count,
                -- Verificamos si el usuario ha dado like al post
                CASE 
                    WHEN EXISTS (SELECT 1 FROM likes WHERE post_id = p.id AND user_id = $1) 
                    THEN TRUE 
                    ELSE FALSE 
                END AS is_liked
            FROM posts p
            JOIN follows f
                ON f.following_id = p.user_id
            JOIN users u
                ON u.id = p.user_id
            LEFT JOIN post_images pi
                ON pi.post_id = p.id
            LEFT JOIN likes l 
                ON l.post_id = p.id
            LEFT JOIN favorites fav 
                ON fav.post_id = p.id
            LEFT JOIN comments c
                ON c.post_id = p.id
            -- Filtro para obtener solo los posts de los usuarios seguidos por el usuario actual
            WHERE f.follower_id = $1
            GROUP BY p.id, u.username  
            ORDER BY p.date DESC;
        `;

        const result = await pool.query(postsQuery, [userId]); // Asegúrate de pasar el userId aquí
        res.json(result.rows);
    } catch (error) {
        console.error('Error al cargar publicaciones:', error);
        res.status(500).json({ message: 'Error al cargar publicaciones' });
    }
});


//POST DE PUBLICACIONES DE POSTEO
app.post('/posts', upload.array('images'), async (req, res) => {
    const { userId, location, caption, description } = req.body;
    const images = req.files.map(file => file.path);

    if (images.length === 0) {
        console.log("No se recibieron imágenes.");
    }

    try {
        const date = new Date().toISOString();

        // Primero intenta insertar el nuevo post y obtener su ID
        const result = await pool.query(
            `INSERT INTO posts (user_id, location, caption, description, date)
             VALUES ($1, $2, $3, $4, $5) RETURNING id`,
            [userId, location, caption, description, date]
        );

        // Verifica si la inserción del post fue exitosa
        const newPost = result.rows[0];
        if (!newPost || !newPost.id) {
            console.error("No se pudo crear el post.");
            return res.status(500).json({ message: 'Error al crear el post' });
        }

        // Si el post fue creado, intenta insertar las imágenes relacionadas
        if (images.length > 0) {
            const imagePromises = images.map(async (imageUrl) => {
                await pool.query(
                    `INSERT INTO post_images (post_id, image_url) VALUES ($1, $2)`,
                    [newPost.id, imageUrl]
                );
            });
            await Promise.all(imagePromises);
        }

        res.status(201).json({
            message: 'Post creado exitosamente',
            post: newPost,
        });
    } catch (error) {
        console.error('Error al crear el post:', error);
        res.status(500).json({ message: 'Error al crear el post' });
    }
});







//GET SEARCH
// Ruta para buscar usuarios en el backend
app.get('/users/search', async (req, res) => {
    const { currentUserId, query } = req.query;

    if (!query) {
        return res.status(400).json({ message: 'Query es requerido' });
    }

    try {
        const result = await pool.query(
            `SELECT u.id, u.username, u.name || ' ' || u.surname AS full_name, u.profile_pic, 
            CASE 
                WHEN f.following_id IS NOT NULL THEN true 
                ELSE false 
            END AS following
            FROM users u
            LEFT JOIN follows f 
            ON f.follower_id = $1 AND f.following_id = u.id
            WHERE (u.username ILIKE $2 OR u.name ILIKE $2 OR u.surname ILIKE $2)
            AND u.id != $1`, // Esto evita que el usuario actual aparezca en sus propios resultados de búsqueda
            [currentUserId, `%${query}%`]
        );

        if (result.rows.length === 0) {
            return res.status(200).json([]); // Devuelve un array vacío si no hay resultados
        }

        res.status(200).json(result.rows.map(user => {
            return {
                id: user.id,
                username: user.username,
                full_name: user.full_name,
                profile_pic: user.profile_pic ? user.profile_pic : null, // O una URL por defecto
                following: user.following // Estado de seguimiento basado en el LEFT JOIN
            };
        }));
    } catch (error) {
        console.error('Error al buscar usuarios:', error);
        res.status(500).json({ message: 'Error al buscar usuarios' });
    }
});



//GET de user para el perfil
app.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;
    // Verifica que el userId esté presente
    if (!userId) {
        return res.status(400).json({ error: 'Falta el userId' });
    }

    try {
        // Consulta para obtener datos del perfil
        const userQuery = `
            SELECT 
                u.id AS user_id,
                u.username,
                u.description,
                u.profile_pic,
                u.cover_image_url,
                CASE 
                    WHEN (SELECT COUNT(*) FROM posts p WHERE p.user_id = u.id) = 0 THEN 'Nivel 1'
                    WHEN (SELECT COUNT(*) FROM posts p WHERE p.user_id = u.id) BETWEEN 1 AND 2 THEN 'Nivel 2'
                    WHEN (SELECT COUNT(*) FROM posts p WHERE p.user_id = u.id) BETWEEN 3 AND 4 THEN 'Nivel 3'
                    WHEN (SELECT COUNT(*) FROM posts p WHERE p.user_id = u.id) >= 4 
                         AND (SELECT COUNT(*) FROM comments c WHERE c.user_id = u.id) >= 4 THEN 'Nivel 4'
                    WHEN (SELECT COUNT(*) FROM posts p WHERE p.user_id = u.id) >= 4 
                         AND (SELECT COUNT(*) FROM comments c WHERE c.user_id = u.id) <= 4 THEN 'Nivel 3'
                END AS level,
                (SELECT COUNT(*) FROM follows f WHERE f.following_id = u.id) AS followers_count,
                (SELECT COUNT(*) FROM follows f WHERE f.follower_id = u.id) AS following_count,
                (SELECT COUNT(*) FROM posts p WHERE p.user_id = u.id) AS posts_count
            FROM users u
            WHERE u.id = $1;
        `;

        // Consulta para obtener publicaciones del usuario
        const postsQuery = `
            SELECT 
                p.id AS post_id,
                p.caption,
                p.location,
                p.date,
                (SELECT array_agg(pi.image_url) FROM post_images pi WHERE pi.post_id = p.id) AS post_images,
                (SELECT COUNT(*) FROM likes l WHERE l.post_id = p.id) AS likes_count,
                (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id) AS comments_count,
                (SELECT COUNT(*) FROM favorites f WHERE f.post_id = p.id) AS favorites_count
            FROM posts p
            WHERE p.user_id = $1;
        `;

        // Ejecutar ambas consultas en paralelo
        const [userResult, postsResult] = await Promise.all([
            pool.query(userQuery, [userId]),
            pool.query(postsQuery, [userId])
        ]);

        // Verificamos si encontramos al usuario
        if (userResult.rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // La respuesta contiene los datos del usuario y sus publicaciones
        const user = userResult.rows[0];
        const posts = postsResult.rows.map(post => ({
            id: post.post_id,
            caption: post.caption,
            location: post.location,
            created_at: post.date,
            images: post.post_images,
            likes_count: post.likes_count,
            comments_count: post.comments_count,
            favorites_count: post.favorites_count,
        }));

        res.json({
            user: {
                id: user.user_id,
                username: user.username,
                profile_image_url: user.profile_pic,
                cover_image_url: user.cover_image_url,
                description: user.description,
                level: user.level,
                followers_count: user.followers_count,
                following_count: user.following_count,
                posts_count: user.posts_count,
            },
            posts,
        });

    } catch (err) {
        console.error('Error en la consulta:', err);
        res.status(500).json({ error: 'Error interno en el servidor' });
    }
});




//PUT descripcion de perfil de usuario
app.put('/user/:id', async (req, res) => {
    const { id } = req.params;
    const { description } = req.body;  // La nueva descripción

    try {
        const updateQuery = `
        UPDATE users 
        SET description = $1
        WHERE id = $2
        RETURNING id, description;
      `;
        const result = await pool.query(updateQuery, [description, id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json({ user: result.rows[0] });
    } catch (err) {
        console.error('Error al actualizar la descripción:', err);
        res.status(500).json({ error: 'Error interno en el servidor' });
    }
});

//UPDATE imagen de encabezado
app.post('/user/update-cover-image', async (req, res) => {
    const { userId, coverImageUrl } = req.body;

    if (!userId || !coverImageUrl) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    try {
        await pool.query(
            `UPDATE users SET cover_image_url = $1 WHERE id = $2`,
            [coverImageUrl, userId]
        );
        res.status(200).json({ message: 'Imagen de encabezado actualizada' });
    } catch (error) {
        console.error('Error al actualizar la imagen de encabezado:', error);
        res.status(500).json({ error: 'Error al actualizar la imagen de encabezado' });
    }
});





//POST DE LIKE
//Endpoint para manejar los me gustas de los usuarios
app.post('/like-post', async (req, res) => {
    const { postId, userId } = req.body;

    if (!postId || !userId) {
        return res.status(400).json({ message: 'postId y userId son requeridos' });
    }

    try {
        // Comprueba si el like ya existe
        const existingLike = await pool.query('SELECT * FROM likes WHERE post_id = $1 AND user_id = $2', [postId, userId]);

        if (existingLike.rows.length > 0) {
            // Si ya existe, eliminamos el like
            await pool.query('DELETE FROM likes WHERE post_id = $1 AND user_id = $2', [postId, userId]);
            return res.json({ liked: false });
        } else {
            // Si no existe, lo insertamos
            await pool.query('INSERT INTO likes (post_id, user_id) VALUES ($1, $2)', [postId, userId]);
            return res.json({ liked: true });
        }
    } catch (error) {
        console.error('Error al gestionar like:', error);
        res.status(500).json({ message: 'Error al gestionar like' });
    }
});






//POST DE FAVORITOS
//Endpoint para manjear los posteos marcados como fav
app.post('/favorite-post', async (req, res) => {
    const { userId, postId } = req.body;

    if (!userId || !postId) {
        return res.status(400).json({ message: 'userId y postId son requeridos' });
    }

    try {
        // Verifica si el post ya está marcado como favorito
        const existingFavorite = await pool.query(
            'SELECT * FROM favorites WHERE user_id = $1 AND post_id = $2',
            [userId, postId]
        );

        if (existingFavorite.rows.length > 0) {
            // Si ya existe, elimina el favorito
            await pool.query(
                'DELETE FROM favorites WHERE user_id = $1 AND post_id = $2',
                [userId, postId]
            );
            res.status(200).json({ message: 'Favorito eliminado', favorited: false });
        } else {
            // Si no existe, agrégalo como favorito
            await pool.query(
                'INSERT INTO favorites (user_id, post_id) VALUES ($1, $2)',
                [userId, postId]
            );
            res.status(200).json({ message: 'Post marcado como favorito', favorited: true });
        }
    } catch (error) {
        console.error('Error al manejar favoritos:', error);
        res.status(500).json({ message: 'Error al manejar favoritos' });
    }
});


//GET DE FAVORITOS
// Asegúrate de que este código esté bien registrado en tu servidor:
app.get('/favorites', async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ message: 'userId es requerido' });
    }

    try {
        const favoritesQuery = `
         SELECT p.id, u.name AS username, p.location, p.caption, p.description, 
                           p.date,
                           array_agg(pi.image_url) AS images,
        	COUNT(DISTINCT l.post_id) AS likes_count,
            COUNT(DISTINCT fav.post_id) AS favorites_count,
            COUNT(DISTINCT c.id) AS comments_count,
        	CASE 
                WHEN EXISTS (SELECT 1 FROM likes WHERE post_id = p.id AND user_id = $1) 
                THEN TRUE 
                ELSE FALSE 
            END AS is_liked
                    FROM favorites f
                    JOIN posts p ON f.post_id = p.id
                    JOIN users u ON u.id = p.user_id
                    LEFT JOIN post_images pi ON pi.post_id = p.id
        			LEFT JOIN likes l 
        	ON l.post_id = p.id
        LEFT JOIN favorites fav 
        	ON fav.post_id = p.id
        LEFT JOIN comments c
        	ON c.post_id = p.id
                    WHERE f.user_id = $1
                    GROUP BY p.id, u.name
                    ORDER BY p.date DESC;
        `;

        const result = await pool.query(favoritesQuery, [userId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No se encontraron favoritos' });
        }

        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error al cargar favoritos:', error);
        res.status(500).json({ message: 'Error al cargar favoritos' });
    }
});





//POST DE COMMENTS
//Endpoint para manejar los comentarios y su logica particular
app.post('/comment-post', async (req, res) => {
    const { postId, userId, comment } = req.body;
    console.log("Intentando agregar comentario con postId:", postId, "y userId:", userId);

    if (!postId || !userId || !comment) {
        console.error("Error: Datos incompletos:", { postId, userId, comment });
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    try {
        // Verifica si el `postId` existe en la tabla `posts`
        const postExists = await pool.query('SELECT id FROM posts WHERE id = $1', [postId]);
        if (postExists.rows.length === 0) {
            console.error("Error: El post con id", postId, "no existe.");
            return res.status(404).json({ message: 'El post no existe' });
        }

        // Verifica si el usuario sigue al autor del post
        const followed = await pool.query(
            'SELECT * FROM follows WHERE follower_id = $1 AND following_id = (SELECT user_id FROM posts WHERE id = $2)',
            [userId, postId]
        );

        console.log('Resultado de verificación de seguimiento:', followed.rows);

        if (followed.rows.length === 0) {
            console.log("Error: El usuario", userId, "no sigue al autor del post", postId);
            return res.status(403).json({ message: 'No puedes comentar en este post porque no sigues a este usuario' });
        }

        // Inserta el comentario si la validación es exitosa
        await pool.query(
            'INSERT INTO comments (post_id, user_id, comment) VALUES ($1, $2, $3)',
            [postId, userId, comment]
        );

        console.log("Comentario agregado exitosamente para postId:", postId);
        res.status(200).json({ message: 'Comentario agregado con éxito' });
    } catch (error) {
        console.error('Error al agregar comentario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});


//GET COMMENT para traer los comentarios realizados por los usuarios de un post especifico

// Backend: obtener comentarios por postId
app.get('/comments', async (req, res) => {
    const { postId } = req.query;

    try {
        const commentsQuery = `
            SELECT c.comment, c.user_id, u.username 
            FROM comments c
            JOIN users u ON c.user_id = u.id
            WHERE c.post_id = $1
            ORDER BY c.created_at DESC;
        `;
        const result = await pool.query(commentsQuery, [postId]);
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener comentarios:', error);
        res.status(500).json({ message: 'Error al obtener comentarios' });
    }
});



//SEARCH SCREEN
//POST DE FOLLOW / UNFOLLOW USERS
app.post('/users/follow', async (req, res) => {
    const { followerId, followingId } = req.body;

    if (!followerId || !followingId) {
        return res.status(400).json({ message: 'Faltan parámetros requeridos' });
    }

    try {
        // Verificar si ya existe una relación de "follow"
        const existingFollow = await pool.query(
            'SELECT * FROM follows WHERE follower_id = $1 AND following_id = $2',
            [followerId, followingId]
        );

        if (existingFollow.rows.length > 0) {
            // Si ya existe, entonces dejar de seguir
            await pool.query(
                'DELETE FROM follows WHERE follower_id = $1 AND following_id = $2',
                [followerId, followingId]
            );
            return res.json({ following: false }); // Retorna false indicando que se dejó de seguir
        } else {
            // Si no existe, seguir al usuario
            await pool.query(
                'INSERT INTO follows (follower_id, following_id) VALUES ($1, $2)',
                [followerId, followingId]
            );
            return res.json({ following: true }); // Retorna true indicando que se comenzó a seguir
        }
    } catch (error) {
        console.error('Error en el endpoint de seguir/dejar de seguir:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
});







app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
});




