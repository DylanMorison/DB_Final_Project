DROP DATABASE IF EXISTS `db_final`;
CREATE DATABASE `db_final`;
USE db_final;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
    `user_id` INT AUTO_INCREMENT,
	`username` VARCHAR(50) UNIQUE,
    `email` VARCHAR(50),
    `user_password` VARCHAR(50),
    `fullName` VARCHAR(50),
    PRIMARY KEY (`user_id`)
    );
    
INSERT INTO `users`
VALUES
    (1, 'lionelMessi', 'theGoat@gmail.com', 'gr3@t3$t3v3r', 'Lionel Messi'),
    (2,'cristianoRonaldo', 'penaldoUnited@gmail.com', 'f@l$eg0@t', 'Cristian Ronalso'),
    (3,'RonaldSteven', 'Ronsteve@gmail.com', 'g0@1fr@ud', 'Ronald Stevens'),
    (4,'johnjones', 'johnj@gmail.com', 'b3$tr0n@ld0', 'Jonathan Jones'),
    (5,'ronald_inho', 'ronaldinho@gmail.com', '5$t@r$kghj7613r', 'Ronald Inho'),
    (6, 'rayHudson', 'rhudson@gmail.com', 'm@g3$t3r1@l', 'Ray Hudson');
    

DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
    `postUid` INT AUTO_INCREMENT,
    `user_id` INT,
    `title` VARCHAR(50),
    `timestamp` TIMESTAMP,
    `description` VARCHAR(50),
    `numLikes` INT,
	`numComments` INT,
    `thumbnail` BLOB,
    `post_file` BLOB,
	PRIMARY KEY (`postUid`),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`)
    );

INSERT INTO `posts`
VALUES 
	(NULL, 1, 'First_Post', '2020-11-08 00:00:01', 'You will', 10, 10, 'thumbnail0.png', 'img0.png'), 
    (NULL, 2, 'Second_Post', '2020-11-08 00:01:01', 'Never', 11, 11, 'thumbnail1.png', 'img1.png'),
    (NULL, 3, 'Third_Post', '2020-11-08 00:02:01', 'Walk', 12, 12,  'thumbnail2.png', 'img2.png'),
    (NULL, 4, 'Fourth_Post', '2020-11-08 00:03:01', 'Alone', 13, 13, 'thumbnail3.png', 'img3.png'),
    (NULL, 5, 'Fifth_Post', '2020-11-08 00:04:01', 'C++ is Superior!!', 14, 14, 'thumbnail4.png', 'img4.png');

DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
    `content` VARCHAR(500) NOT NULL,
    `user_id` INT,
	`postUid` INT,
    `timestamp` TIMESTAMP,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`),
	FOREIGN KEY (`postUid`) REFERENCES `posts`(`postUid`)
    );
    
INSERT INTO `comments`
VALUES 
	('Wow great post', 1, 1, '2020-11-08 00:00:30'),
    ('I love this!', 2, 2, '2020-11-08 00:00:30'),
    ('I love 3D-printing!!', 3, 3, '2020-11-08 00:00:30'),
    ('How did you make this!', 4, 4, '2020-11-08 00:00:30'),
    ('No way!', 5, 5, '2020-11-08 00:00:30');
    
DROP TABLE IF EXISTS `following`;
CREATE TABLE `following` (
    `follower_id` INT,
    `followee_id` INT,
	
    FOREIGN KEY (`follower_id`) REFERENCES `users`(`user_id`),
    FOREIGN KEY (`followee_id`) REFERENCES `users`(`user_id`)
    );
    
INSERT INTO `following` 
VALUES 
	(1, 2), 
    (1, 3), 
    (1, 6), 
    (2, 1),
    (4, 3);
    
DROP TABLE IF EXISTS `likes`;
CREATE TABLE `likes` (
    `postUid` INT,
    `user_id` INT,
    
    FOREIGN KEY (`postUid`) REFERENCES `posts`(`postUid`),
    FOREIGN KEY (`postUid`) REFERENCES `users`(`user_id`)
    );
    
INSERT INTO `likes`
VALUES 
	(1, 1), 
    (2, 2), 
    (3, 3), 
    (4, 4), 
    (4, 5);