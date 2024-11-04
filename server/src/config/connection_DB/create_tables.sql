-- Criação da tabela 'users'
CREATE TABLE IF NOT EXISTS users (
    user_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Criação da tabela 'posts'
CREATE TABLE IF NOT EXISTS posts (
    post_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Criação da tabela 'comments'
CREATE TABLE IF NOT EXISTS comments (
    comment_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    commentCol VARCHAR(255) NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    post_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Criação da tabela 'likes'
CREATE TABLE IF NOT EXISTS likes (
    like_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    post_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Criação da tabela 'ratings'
CREATE TABLE IF NOT EXISTS ratings (
    rating_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    rateCol TINYINT NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    post_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE ON UPDATE CASCADE
);