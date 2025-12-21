CREATE TABLE IF NOT EXISTS pilot (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT,
    gender VARCHAR(20),
    nationality VARCHAR(255) NOT NULL,
    vehicle_restriction VARCHAR(50),
    allowed_range_km INT,
    seniority VARCHAR(20)
);

INSERT INTO pilot (name, age, gender, nationality, vehicle_restriction, allowed_range_km, seniority)
VALUES
('John Williams', 52, 'MALE', 'USA', 'AIRBUS_A320', 8000, 'SENIOR'),
('Emily Clark', 29, 'FEMALE', 'UK', 'BOEING_737', 5500, 'JUNIOR'),
('Kenji Yamato', 34, 'MALE', 'Japan', 'AIRBUS_A330', 6000, 'SENIOR'),
('Maria Lopez', 26, 'FEMALE', 'Spain', 'BOEING_737', 4500, 'TRAINEE'),
('Hassan Al-Farsi', 41, 'MALE', 'UAE', 'BOEING_777', 12000, 'SENIOR'),
('Lucas Schneider', 37, 'MALE', 'Germany', 'AIRBUS_A320', 9000, 'SENIOR'),
('Aylin Yıldırım', 31, 'FEMALE', 'Turkey', 'AIRBUS_A320', 7200, 'JUNIOR'),
('Santiago Rivera', 28, 'MALE', 'Chile', 'BOEING_737', 5200, 'JUNIOR'),
('Zhang Wei', 45, 'MALE', 'China', 'BOEING_787', 13500, 'SENIOR'),
('Olivia Thompson', 27, 'FEMALE', 'Australia', 'AIRBUS_A320', 3800, 'TRAINEE'),
('Victor Ivanov', 49, 'MALE', 'Russia', 'BOEING_777', 13000, 'SENIOR'),
('Joon Park', 33, 'MALE', 'South Korea', 'AIRBUS_A320', 6800, 'JUNIOR'),
('Daniela Moretti', 38, 'FEMALE', 'Italy', 'AIRBUS_A330', 8800, 'SENIOR'),
('Samuel Brown', 25, 'MALE', 'Canada', 'BOEING_737', 3200, 'TRAINEE'),
('Ahmed El-Masry', 43, 'MALE', 'Egypt', 'BOEING_787', 11000, 'SENIOR'),
('Nina Korhonen', 36, 'FEMALE', 'Finland', 'AIRBUS_A330', 4100, 'JUNIOR'),
('Pedro Alvarez', 30, 'MALE', 'Mexico', 'BOEING_737', 5000, 'JUNIOR'),
('Hiroshi Tanaka', 55, 'MALE', 'Japan', 'BOEING_777', 15000, 'SENIOR'),
('Emma Johansson', 32, 'FEMALE', 'Sweden', 'AIRBUS_A330', 7000, 'JUNIOR'),
('Yusuf Demir', 27, 'MALE', 'Turkey', 'BOEING_737', 4800, 'TRAINEE');


INSERT INTO pilot (name, age, gender, nationality, vehicle_restriction, allowed_range_km, seniority)
VALUES
-- =========================
-- BOEING 777 - JUNIOR (KRİTİK)
-- =========================
('Burak Arslan', 33, 'MALE', 'Turkey', 'BOEING_777', 8200, 'JUNIOR'),
('Mert Aydın', 35, 'MALE', 'Turkey', 'BOEING_777', 9100, 'JUNIOR'),
('Elif Karaca', 31, 'FEMALE', 'Turkey', 'BOEING_777', 8800, 'JUNIOR'),
('Andrei Popescu', 34, 'MALE', 'Romania', 'BOEING_777', 9000, 'JUNIOR'),
('Pavel Novak', 36, 'MALE', 'Czech Republic', 'BOEING_777', 8700, 'JUNIOR'),
('Isabella Rossi', 32, 'FEMALE', 'Italy', 'BOEING_777', 8600, 'JUNIOR'),
('Marco Bianchi', 38, 'MALE', 'Italy', 'BOEING_777', 9300, 'JUNIOR'),
('Nikola Jovic', 35, 'MALE', 'Serbia', 'BOEING_777', 8900, 'JUNIOR'),

-- =========================
-- BOEING 777 - SENIOR (DENGE)
-- =========================
('Ahmet Çelik', 48, 'MALE', 'Turkey', 'BOEING_777', 14000, 'SENIOR'),
('George Papadopoulos', 50, 'MALE', 'Greece', 'BOEING_777', 14500, 'SENIOR'),
('Michael Anderson', 54, 'MALE', 'USA', 'BOEING_777', 15000, 'SENIOR'),
('Franz Müller', 52, 'MALE', 'Germany', 'BOEING_777', 14200, 'SENIOR'),

-- =========================
-- BOEING 787
-- =========================
('Can Yılmaz', 34, 'MALE', 'Turkey', 'BOEING_787', 9800, 'JUNIOR'),
('Julia Becker', 41, 'FEMALE', 'Germany', 'BOEING_787', 12000, 'SENIOR'),
('Robert King', 46, 'MALE', 'USA', 'BOEING_787', 13500, 'SENIOR'),

-- =========================
-- AIRBUS A330
-- =========================
('Deniz Öztürk', 29, 'FEMALE', 'Turkey', 'AIRBUS_A330', 7200, 'JUNIOR'),
('Thomas Laurent', 44, 'MALE', 'France', 'AIRBUS_A330', 10000, 'SENIOR'),
('Eva Svensson', 39, 'FEMALE', 'Sweden', 'AIRBUS_A330', 9500, 'SENIOR'),

-- =========================
-- AIRBUS A320
-- =========================
('Okan Şahin', 28, 'MALE', 'Turkey', 'AIRBUS_A320', 4800, 'JUNIOR'),
('Melis Aksoy', 30, 'FEMALE', 'Turkey', 'AIRBUS_A320', 5100, 'JUNIOR'),
('Jan Kowalski', 45, 'MALE', 'Poland', 'AIRBUS_A320', 6500, 'SENIOR'),
('Luis Fernandez', 42, 'MALE', 'Spain', 'AIRBUS_A320', 6200, 'SENIOR'),

-- =========================
-- BOEING 737
-- =========================
('Emre Koç', 27, 'MALE', 'Turkey', 'BOEING_737', 4200, 'TRAINEE'),
('Ayşe Demir', 29, 'FEMALE', 'Turkey', 'BOEING_737', 4700, 'JUNIOR'),
('David Wilson', 47, 'MALE', 'UK', 'BOEING_737', 6000, 'SENIOR');


-- =====================================================
-- AIRBUS A320 (UZUN + ORTA MENZİL DESTEK)
-- =====================================================
INSERT INTO pilot
(name, age, gender, nationality, vehicle_restriction, allowed_range_km, seniority)
VALUES
('Selim Karataş', 49, 'MALE', 'Turkey', 'AIRBUS_A320', 10500, 'SENIOR'),
('Burcu Aydın', 37, 'FEMALE', 'Turkey', 'AIRBUS_A320', 8200, 'JUNIOR'),
('Thomas Weber', 44, 'MALE', 'Germany', 'AIRBUS_A320', 9000, 'SENIOR'),
('Laura Conti', 35, 'FEMALE', 'Italy', 'AIRBUS_A320', 7800, 'JUNIOR');

-- =====================================================
-- BOEING 737 (YOĞUN KISA MENZİL)
-- =====================================================
INSERT INTO pilot
(name, age, gender, nationality, vehicle_restriction, allowed_range_km, seniority)
VALUES
('Tolga Erdem', 42, 'MALE', 'Turkey', 'BOEING_737', 6200, 'SENIOR'),
('Kaan Polat', 31, 'MALE', 'Turkey', 'BOEING_737', 4800, 'JUNIOR'),
('Maja Novak', 39, 'FEMALE', 'Czech Republic', 'BOEING_737', 5500, 'SENIOR');

-- =====================================================
-- AIRBUS A330 (3 PİLOT DENGESİ)
-- =====================================================
INSERT INTO pilot
(name, age, gender, nationality, vehicle_restriction, allowed_range_km, seniority)
VALUES
('Cem Şahin', 46, 'MALE', 'Turkey', 'AIRBUS_A330', 11500, 'SENIOR'),
('Andrea Romano', 34, 'MALE', 'Italy', 'AIRBUS_A330', 9000, 'JUNIOR'),
('Elena Petrova', 41, 'FEMALE', 'Bulgaria', 'AIRBUS_A330', 9800, 'SENIOR');

-- =====================================================
-- BOEING 787 (UZUN MENZİL / YEDEK HAVUZ)
-- =====================================================
INSERT INTO pilot
(name, age, gender, nationality, vehicle_restriction, allowed_range_km, seniority)
VALUES
('Özgür Yalçın', 52, 'MALE', 'Turkey', 'BOEING_787', 15000, 'SENIOR'),
('Min-Jae Kim', 36, 'MALE', 'South Korea', 'BOEING_787', 10500, 'JUNIOR'),
('Carlos Mendes', 45, 'MALE', 'Portugal', 'BOEING_787', 13000, 'SENIOR');


-- =====================================================
-- MASSIVE DATA EXPANSION: PILOT POOL (BATCH 16-20)
-- Constraint: Low Junior Ratio (High Seniority Focus)
-- =====================================================

-- =====================================================
-- BATCH 16: LEGENDARY PAINTERS & ARTISTS
-- High seniority (Older, experienced).
-- =====================================================
INSERT INTO pilot (name, age, gender, nationality, vehicle_restriction, allowed_range_km, seniority) VALUES
('Vincent van Gogh', 55, 'MALE', 'Netherlands', 'BOEING_777', 14500, 'SENIOR'),
('Pablo Picasso', 60, 'MALE', 'Spain', 'AIRBUS_A330', 13000, 'SENIOR'),
('Claude Monet', 65, 'MALE', 'France', 'BOEING_787', 14000, 'SENIOR'),
('Salvador Dali', 58, 'MALE', 'Spain', 'AIRBUS_A320', 9500, 'JUNIOR'),
('Rembrandt van Rijn', 62, 'MALE', 'Netherlands', 'BOEING_777', 15000, 'SENIOR'),
('Frida Kahlo', 48, 'FEMALE', 'Mexico', 'BOEING_737', 8500, 'SENIOR'),
('Leonardo da Vinci', 67, 'MALE', 'Italy', 'AIRBUS_A330', 12500, 'SENIOR'), -- Duplicate check: if exists, ignore or use distinct ID
('Gustav Klimt', 50, 'MALE', 'Austria', 'BOEING_787', 13500, 'SENIOR'),
('Edvard Munch', 55, 'MALE', 'Norway', 'AIRBUS_A320', 9000, 'SENIOR'),
('Henri Matisse', 59, 'MALE', 'France', 'BOEING_777', 14200, 'JUNIOR'),
('Johannes Vermeer', 45, 'MALE', 'Netherlands', 'BOEING_737', 8800, 'TRAINEE'),
('Jackson Pollock', 44, 'MALE', 'USA', 'AIRBUS_A330', 11000, 'TRAINEE'),
('Andy Warhol', 52, 'MALE', 'USA', 'BOEING_787', 12800, 'SENIOR'),
('Georgia O Keeffe', 60, 'FEMALE', 'USA', 'AIRBUS_A320', 9200, 'SENIOR'),
('Rene Magritte', 55, 'MALE', 'Belgium', 'BOEING_777', 13800, 'SENIOR');

-- =====================================================
-- BATCH 17: FAMOUS FILM DIRECTORS
-- Leadership roles (Chief Pilots/Seniors).
-- =====================================================
INSERT INTO pilot (name, age, gender, nationality, vehicle_restriction, allowed_range_km, seniority) VALUES
('Steven Spielberg', 65, 'MALE', 'USA', 'BOEING_777', 16000, 'JUNIOR'),
('Martin Scorsese', 68, 'MALE', 'USA', 'AIRBUS_A330', 15000, 'SENIOR'),
('Christopher Nolan', 50, 'MALE', 'UK', 'BOEING_787', 14800, 'JUNIOR'),
('Quentin Tarantino', 55, 'MALE', 'USA', 'BOEING_737', 11000, 'SENIOR'),
('Alfred Hitchcock', 70, 'MALE', 'UK', 'AIRBUS_A320', 10000, 'SENIOR'),
('Stanley Kubrick', 60, 'MALE', 'USA', 'BOEING_777', 15500, 'TRAINEE'),
('Hayao Miyazaki', 75, 'MALE', 'Japan', 'AIRBUS_A330', 13500, 'TRAINEE'),
('Akira Kurosawa', 78, 'MALE', 'Japan', 'BOEING_787', 14000, 'SENIOR'),
('Francis Ford Coppola', 72, 'MALE', 'USA', 'BOEING_777', 14500, 'SENIOR'),
('James Cameron', 66, 'MALE', 'Canada', 'AIRBUS_A330', 14800, 'SENIOR'),
('Ridley Scott', 70, 'MALE', 'UK', 'BOEING_787', 13800, 'SENIOR'),
('Peter Jackson', 59, 'MALE', 'New Zealand', 'BOEING_777', 14200, 'SENIOR'),
('George Lucas', 70, 'MALE', 'USA', 'BOEING_737', 10500, 'SENIOR'),
('Tim Burton', 60, 'MALE', 'USA', 'AIRBUS_A320', 9500, 'SENIOR'),
('Wes Anderson', 50, 'MALE', 'USA', 'BOEING_737', 6000, 'JUNIOR'), -- Rare Junior
('Greta Gerwig', 38, 'FEMALE', 'USA', 'AIRBUS_A320', 5500, 'JUNIOR'); -- Rare Junior

-- =====================================================
-- BATCH 18: ANCIENT LEADERS & WARRIORS
-- Experienced Commanders (Seniors).
-- =====================================================
INSERT INTO pilot (name, age, gender, nationality, vehicle_restriction, allowed_range_km, seniority) VALUES
('Julius Caesar', 55, 'MALE', 'Italy', 'BOEING_777', 15000, 'SENIOR'),
('Alexander Great', 33, 'MALE', 'Greece', 'BOEING_787', 14500, 'SENIOR'), -- Young but Senior rank due to skill
('Genghis Khan', 60, 'MALE', 'Mongolia', 'AIRBUS_A330', 14000, 'SENIOR'),
('Napoleon Bonaparte', 50, 'MALE', 'France', 'AIRBUS_A320', 11000, 'SENIOR'),
('Hannibal Barca', 58, 'MALE', 'Tunisia', 'BOEING_777', 13500, 'SENIOR'),
('Winston Churchill', 70, 'MALE', 'UK', 'BOEING_737', 10000, 'SENIOR'),
('Nelson Mandela', 75, 'MALE', 'South Africa', 'AIRBUS_A330', 12500, 'SENIOR'),
('Mahatma Gandhi', 72, 'MALE', 'India', 'BOEING_787', 12000, 'SENIOR'),
('Queen Victoria', 65, 'FEMALE', 'UK', 'BOEING_777', 13000, 'SENIOR'),
('Cleopatra Philopator', 39, 'FEMALE', 'Egypt', 'AIRBUS_A320', 9000, 'SENIOR'),
('Joan of Arc', 29, 'FEMALE', 'France', 'BOEING_737', 7500, 'JUNIOR'), -- Young hero
('Saladin Ayyubi', 55, 'MALE', 'Iraq', 'AIRBUS_A330', 13200, 'SENIOR'),
('Suleiman Magnificent', 60, 'MALE', 'Turkey', 'BOEING_777', 15500, 'SENIOR'),
('Mehmed Conqueror', 49, 'MALE', 'Turkey', 'BOEING_787', 14500, 'SENIOR'),
('Mustafa Kemal', 57, 'MALE', 'Turkey', 'AIRBUS_A330', 15000, 'SENIOR');

-- =====================================================
-- BATCH 19: ACTION MOVIE CHARACTERS
-- Skilled pilots (Mix of Senior and Junior).
-- =====================================================
INSERT INTO pilot (name, age, gender, nationality, vehicle_restriction, allowed_range_km, seniority) VALUES
('James Bond', 45, 'MALE', 'UK', 'BOEING_777', 14000, 'SENIOR'),
('Ethan Hunt', 40, 'MALE', 'USA', 'BOEING_787', 13500, 'SENIOR'),
('Jason Bourne', 35, 'MALE', 'USA', 'AIRBUS_A320', 8500, 'JUNIOR'),
('John Wick', 42, 'MALE', 'USA', 'BOEING_737', 9500, 'SENIOR'),
('Ellen Ripley', 38, 'FEMALE', 'USA', 'AIRBUS_A330', 11000, 'SENIOR'),
('Sarah Connor', 36, 'FEMALE', 'USA', 'BOEING_737', 7000, 'JUNIOR'),
('Indiana Jones', 50, 'MALE', 'USA', 'BOEING_777', 12500, 'SENIOR'),
('Han Solo', 35, 'MALE', 'USA', 'BOEING_787', 9000, 'JUNIOR'),
('Luke Skywalker', 28, 'MALE', 'USA', 'AIRBUS_A320', 6000, 'TRAINEE'),
('Leia Organa', 28, 'FEMALE', 'USA', 'AIRBUS_A330', 8500, 'JUNIOR'),
('Neo Anderson', 30, 'MALE', 'USA', 'BOEING_777', 9800, 'JUNIOR'),
('Trinity Moss', 30, 'FEMALE', 'Canada', 'BOEING_787', 9500, 'JUNIOR'),
('Morpheus Lawrence', 50, 'MALE', 'USA', 'AIRBUS_A330', 13000, 'SENIOR'),
('Rocky Balboa', 50, 'MALE', 'USA', 'BOEING_737', 8000, 'SENIOR'),
('Rambo John', 45, 'MALE', 'USA', 'AIRBUS_A320', 8200, 'JUNIOR');

-- =====================================================
-- BATCH 20: INTERNATIONAL ARCHITECTS & DESIGNERS
-- Precise and Senior.
-- =====================================================
INSERT INTO pilot (name, age, gender, nationality, vehicle_restriction, allowed_range_km, seniority) VALUES
('Zaha Hadid', 60, 'FEMALE', 'Iraq', 'BOEING_777', 14200, 'SENIOR'),
('Frank Lloyd Wright', 70, 'MALE', 'USA', 'AIRBUS_A330', 13500, 'JUNIOR'),
('Le Corbusier', 65, 'MALE', 'Switzerland', 'BOEING_787', 13800, 'SENIOR'),
('Antoni Gaudi', 62, 'MALE', 'Spain', 'AIRBUS_A320', 10500, 'SENIOR'),
('Norman Foster', 68, 'MALE', 'UK', 'BOEING_737', 11000, 'JUNIOR'),
('Renzo Piano', 66, 'MALE', 'Italy', 'BOEING_777', 14500, 'SENIOR'),
('Mimar Sinan', 80, 'MALE', 'Turkey', 'AIRBUS_A330', 15000, 'SENIOR'),
('Frank Gehry', 75, 'MALE', 'Canada', 'BOEING_787', 13000, 'SENIOR'),
('Ieoh Ming Pei', 80, 'MALE', 'China', 'AIRBUS_A320', 11500, 'SENIOR'),
('Tadao Ando', 70, 'MALE', 'Japan', 'BOEING_737', 10800, 'SENIOR');


INSERT INTO pilot (name, age, gender, nationality, vehicle_restriction, allowed_range_km, seniority) VALUES
('Aaron Mitchell', 46, 'MALE', 'USA', 'BOEING_777', 14800, 'SENIOR'),
('Brian Collins', 39, 'MALE', 'USA', 'BOEING_777', 13200, 'JUNIOR'),
('Kevin O Neill', 52, 'MALE', 'Ireland', 'BOEING_777', 15000, 'SENIOR'),
('Patrick Doyle', 44, 'MALE', 'Ireland', 'BOEING_777', 13800, 'SENIOR'),
('Liam Gallagher', 36, 'MALE', 'UK', 'BOEING_777', 12000, 'JUNIOR'),
('Noah Thompson', 28, 'MALE', 'UK', 'BOEING_777', 9500, 'TRAINEE'),
('Oliver Grant', 49, 'MALE', 'UK', 'BOEING_777', 14500, 'SENIOR'),
('Ethan Brooks', 41, 'MALE', 'Canada', 'BOEING_777', 14000, 'SENIOR'),
('Lucas Martin', 34, 'MALE', 'France', 'BOEING_777', 11800, 'JUNIOR'),
('Julien Morel', 55, 'MALE', 'France', 'BOEING_777', 15000, 'SENIOR'),

('Hans Kruger', 47, 'MALE', 'Germany', 'BOEING_777', 14600, 'SENIOR'),
('Stefan Lehmann', 33, 'MALE', 'Germany', 'BOEING_777', 11000, 'JUNIOR'),
('Marco Vitale', 45, 'MALE', 'Italy', 'BOEING_777', 14200, 'SENIOR'),
('Alessio Romano', 29, 'MALE', 'Italy', 'BOEING_777', 9800, 'TRAINEE'),
('Carlos Mendez', 51, 'MALE', 'Spain', 'BOEING_777', 14700, 'SENIOR'),
('Javier Ortega', 37, 'MALE', 'Spain', 'BOEING_777', 12300, 'JUNIOR'),
('Miguel Torres', 42, 'MALE', 'Spain', 'BOEING_777', 13500, 'SENIOR'),
('Andres Silva', 48, 'MALE', 'Chile', 'BOEING_777', 14000, 'SENIOR'),
('Rafael Costa', 35, 'MALE', 'Brazil', 'BOEING_777', 11800, 'JUNIOR'),
('Joao Pereira', 53, 'MALE', 'Portugal', 'BOEING_777', 15000, 'SENIOR'),

('Sergey Ivanov', 50, 'MALE', 'Russia', 'BOEING_777', 14900, 'SENIOR'),
('Dmitri Volkov', 38, 'MALE', 'Russia', 'BOEING_777', 12500, 'JUNIOR'),
('Alexei Smirnov', 29, 'MALE', 'Russia', 'BOEING_777', 9600, 'TRAINEE'),
('Igor Petrov', 44, 'MALE', 'Russia', 'BOEING_777', 13700, 'SENIOR'),
('Oleg Kuznetsov', 55, 'MALE', 'Russia', 'BOEING_777', 15000, 'SENIOR'),

('Mehmet Kaya', 46, 'MALE', 'Turkey', 'BOEING_777', 14500, 'SENIOR'),
('Serkan Yılmaz', 39, 'MALE', 'Turkey', 'BOEING_777', 13000, 'JUNIOR'),
('Volkan Demir', 34, 'MALE', 'Turkey', 'BOEING_777', 11500, 'JUNIOR'),
('Emrah Aslan', 28, 'MALE', 'Turkey', 'BOEING_777', 9000, 'TRAINEE'),
('Haluk Şener', 52, 'MALE', 'Turkey', 'BOEING_777', 15000, 'SENIOR');


INSERT INTO pilot VALUES
(NULL,'Daniel Cooper',45,'MALE','USA','BOEING_787',14000,'SENIOR'),
(NULL,'Ryan Scott',32,'MALE','USA','BOEING_787',11000,'JUNIOR'),
(NULL,'Chris Evans',27,'MALE','USA','BOEING_787',8500,'TRAINEE'),
(NULL,'Mark Wilson',50,'MALE','USA','BOEING_787',15000,'SENIOR'),
(NULL,'Andrew Miller',41,'MALE','USA','BOEING_787',13500,'SENIOR'),

(NULL,'Kenji Sato',48,'MALE','Japan','BOEING_787',14500,'SENIOR'),
(NULL,'Taro Nakamura',35,'MALE','Japan','BOEING_787',12000,'JUNIOR'),
(NULL,'Shinji Mori',29,'MALE','Japan','BOEING_787',9000,'TRAINEE'),

(NULL,'Wei Zhang',52,'MALE','China','BOEING_787',15000,'SENIOR'),
(NULL,'Li Ming',38,'MALE','China','BOEING_787',13000,'JUNIOR'),
(NULL,'Chen Hao',31,'MALE','China','BOEING_787',11000,'JUNIOR'),

(NULL,'Min Ho Lee',44,'MALE','South Korea','BOEING_787',14200,'SENIOR'),
(NULL,'Jin Woo Park',36,'MALE','South Korea','BOEING_787',12500,'JUNIOR'),
(NULL,'Seung Kim',28,'MALE','South Korea','BOEING_787',8800,'TRAINEE');


INSERT INTO pilot VALUES
(NULL,'Paul Schneider',49,'MALE','Germany','AIRBUS_A330',14500,'SENIOR'),
(NULL,'Florian Beck',34,'MALE','Germany','AIRBUS_A330',11500,'JUNIOR'),
(NULL,'Thomas Klein',27,'MALE','Germany','AIRBUS_A330',8200,'TRAINEE'),

(NULL,'Jean Dupuis',51,'MALE','France','AIRBUS_A330',15000,'SENIOR'),
(NULL,'Luc Martin',39,'MALE','France','AIRBUS_A330',13000,'JUNIOR'),

(NULL,'Ahmet Yıldız',46,'MALE','Turkey','AIRBUS_A330',14000,'SENIOR'),
(NULL,'Burak Can',33,'MALE','Turkey','AIRBUS_A330',11000,'JUNIOR'),
(NULL,'Oğuzhan Aksoy',28,'MALE','Turkey','AIRBUS_A330',9000,'TRAINEE');


INSERT INTO pilot VALUES
(NULL,'Kevin Brown',44,'MALE','USA','AIRBUS_A320',6500,'SENIOR'),
(NULL,'Adam Green',29,'MALE','USA','AIRBUS_A320',4800,'JUNIOR'),
(NULL,'Nick Taylor',24,'MALE','USA','AIRBUS_A320',3500,'TRAINEE'),

(NULL,'Murat Çetin',41,'MALE','Turkey','AIRBUS_A320',6200,'SENIOR'),
(NULL,'Emre Polat',30,'MALE','Turkey','AIRBUS_A320',5000,'JUNIOR'),
(NULL,'Kaan Uslu',26,'MALE','Turkey','AIRBUS_A320',3800,'TRAINEE');


INSERT INTO pilot VALUES
(NULL,'James Parker',48,'MALE','USA','BOEING_737',6200,'SENIOR'),
(NULL,'Tom Harris',34,'MALE','USA','BOEING_737',4800,'JUNIOR'),
(NULL,'Luke Adams',25,'MALE','USA','BOEING_737',3300,'TRAINEE'),

(NULL,'Ali Şahin',43,'MALE','Turkey','BOEING_737',6000,'SENIOR'),
(NULL,'Furkan Demir',31,'MALE','Turkey','BOEING_737',4700,'JUNIOR'),
(NULL,'Berk Acar',23,'MALE','Turkey','BOEING_737',3100,'TRAINEE');
