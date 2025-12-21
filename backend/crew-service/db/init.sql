-- =====================================================
-- TABLE CREATION
-- =====================================================

CREATE TABLE IF NOT EXISTS cabin_crew (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    age INT,
    gender VARCHAR(50),
    nationality VARCHAR(255),
    attendant_type VARCHAR(50),
    seniority_level VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS crew_languages (
    crew_id BIGINT,
    language VARCHAR(255),
    FOREIGN KEY (crew_id) REFERENCES cabin_crew(id)
);

CREATE TABLE IF NOT EXISTS attendant_vehicle_restrictions (
    attendant_id BIGINT,
    vehicle_type VARCHAR(50),
    FOREIGN KEY (attendant_id) REFERENCES cabin_crew(id)
);

CREATE TABLE IF NOT EXISTS crew_dish_recipes (
    crew_id BIGINT,
    dish_name VARCHAR(50),
    FOREIGN KEY (crew_id) REFERENCES cabin_crew(id)
);

-- =====================================================
-- EXISTING DATA (PRESERVED)
-- =====================================================

-- ID: 1
INSERT INTO cabin_crew (name, age, gender, nationality, attendant_type, seniority_level) 
VALUES ('Ayşe Yılmaz', 34, 'FEMALE', 'Turkish', 'CHIEF', 'SENIOR');

-- ID: 2
INSERT INTO cabin_crew (name, age, gender, nationality, attendant_type, seniority_level) 
VALUES ('John Doe', 26, 'MALE', 'American', 'REGULAR', 'JUNIOR');

-- ID: 3
INSERT INTO cabin_crew (name, age, gender, nationality, attendant_type, seniority_level) 
VALUES ('Mario Rossi', 40, 'MALE', 'Italian', 'CHEF', 'SENIOR');

-- ID: 4
INSERT INTO cabin_crew (name, age, gender, nationality, attendant_type, seniority_level) 
VALUES ('Zeynep Kaya', 22, 'FEMALE', 'Turkish', 'REGULAR', 'TRAINEE');

-- ID: 5
INSERT INTO cabin_crew (name, age, gender, nationality, attendant_type, seniority_level) 
VALUES ('Hans Muller', 38, 'MALE', 'German', 'CHIEF', 'SENIOR');

INSERT INTO crew_languages (crew_id, language) VALUES (1, 'Turkish');
INSERT INTO crew_languages (crew_id, language) VALUES (1, 'English');
INSERT INTO crew_languages (crew_id, language) VALUES (2, 'English');
INSERT INTO crew_languages (crew_id, language) VALUES (2, 'Spanish');
INSERT INTO crew_languages (crew_id, language) VALUES (3, 'Italian');
INSERT INTO crew_languages (crew_id, language) VALUES (3, 'English');
INSERT INTO crew_languages (crew_id, language) VALUES (3, 'French');
INSERT INTO crew_languages (crew_id, language) VALUES (4, 'Turkish');
INSERT INTO crew_languages (crew_id, language) VALUES (4, 'English');

INSERT INTO attendant_vehicle_restrictions (attendant_id, vehicle_type) VALUES (1, 'BOEING_777');
INSERT INTO attendant_vehicle_restrictions (attendant_id, vehicle_type) VALUES (1, 'AIRBUS_A320');
INSERT INTO attendant_vehicle_restrictions (attendant_id, vehicle_type) VALUES (2, 'AIRBUS_A320');
INSERT INTO attendant_vehicle_restrictions (attendant_id, vehicle_type) VALUES (3, 'BOEING_777');
INSERT INTO attendant_vehicle_restrictions (attendant_id, vehicle_type) VALUES (4, 'BOEING_777');
INSERT INTO attendant_vehicle_restrictions (attendant_id, vehicle_type) VALUES (5, 'BOEING_777');

INSERT INTO crew_dish_recipes (crew_id, dish_name) VALUES (3, 'LASAGNA');
INSERT INTO crew_dish_recipes (crew_id, dish_name) VALUES (3, 'RISOTTO');
INSERT INTO crew_dish_recipes (crew_id, dish_name) VALUES (3, 'TIRAMISU');

-- IDs: 6 to 17
INSERT INTO cabin_crew (name, age, gender, nationality, attendant_type, seniority_level) VALUES
('Elif Demir', 29, 'FEMALE', 'Turkish', 'REGULAR', 'JUNIOR'),
('Mehmet Arslan', 36, 'MALE', 'Turkish', 'REGULAR', 'SENIOR'),
('Sarah Johnson', 41, 'FEMALE', 'American', 'CHIEF', 'SENIOR'),
('Ali Can Özkan', 27, 'MALE', 'Turkish', 'REGULAR', 'JUNIOR'),
('Francesca Bianchi', 43, 'FEMALE', 'Italian', 'CHEF', 'SENIOR'),
('Mustafa Yıldız', 24, 'MALE', 'Turkish', 'REGULAR', 'TRAINEE'),
('Laura Schmidt', 35, 'FEMALE', 'German', 'REGULAR', 'SENIOR'),
('Caner Koç', 31, 'MALE', 'Turkish', 'REGULAR', 'JUNIOR'),
('Sophie Martin', 38, 'FEMALE', 'French', 'CHIEF', 'SENIOR'),
('Ahmet Kurt', 28, 'MALE', 'Turkish', 'REGULAR', 'JUNIOR'),
('Giulia Romano', 34, 'FEMALE', 'Italian', 'REGULAR', 'SENIOR'),
('Yusuf Aydın', 26, 'MALE', 'Turkish', 'REGULAR', 'TRAINEE');

INSERT INTO crew_languages (crew_id, language) VALUES
(6,'Turkish'), (6,'English'),
(7,'Turkish'),
(8,'English'), (8,'German'),
(9,'Turkish'), (9,'English'),
(10,'Italian'), (10,'English'),
(11,'Turkish'),
(12,'German'), (12,'English'),
(13,'Turkish'),
(14,'French'), (14,'English'),
(15,'Turkish'),
(16,'Italian'), (16,'English');

INSERT INTO attendant_vehicle_restrictions (attendant_id, vehicle_type) VALUES
(6,'BOEING_777'),
(7,'BOEING_777'),
(8,'AIRBUS_A320'),
(9,'BOEING_777'),
(10,'BOEING_777'),
(11,'AIRBUS_A320'),
(12,'BOEING_777'),
(13,'BOEING_777'),
(14,'BOEING_777'),
(15,'AIRBUS_A320'),
(16,'BOEING_777');

INSERT INTO crew_dish_recipes (crew_id, dish_name) VALUES
(10,'RISOTTO'),
(10,'GNOCCHI'),
(10,'TIRAMISU'),
(15,'PIZZA'),
(15,'PASTA');

-- =====================================================
-- AIRBUS A320 / BOEING 737 CREW (EXISTING)
-- IDs: 18 to 22
-- =====================================================
INSERT INTO cabin_crew (name, age, gender, nationality, attendant_type, seniority_level)
VALUES
('Burak Çetin', 39, 'MALE', 'Turkish', 'CHIEF', 'SENIOR'),
('Derya Akın', 28, 'FEMALE', 'Turkish', 'REGULAR', 'JUNIOR'),
('Oğuzhan Kılıç', 31, 'MALE', 'Turkish', 'REGULAR', 'JUNIOR'),
('Selin Uçar', 26, 'FEMALE', 'Turkish', 'REGULAR', 'TRAINEE'),
('Martin Vogel', 42, 'MALE', 'German', 'REGULAR', 'SENIOR');

-- Vehicle Restrictions for IDs 18-22 (Assuming A320/B737)
INSERT INTO attendant_vehicle_restrictions (attendant_id, vehicle_type) VALUES
(18, 'AIRBUS_A320'), (18, 'BOEING_737'),
(19, 'AIRBUS_A320'), (19, 'BOEING_737'),
(20, 'AIRBUS_A320'), (20, 'BOEING_737'),
(21, 'AIRBUS_A320'), (21, 'BOEING_737'),
(22, 'AIRBUS_A320'), (22, 'BOEING_737');

-- Languages for IDs 18-22
INSERT INTO crew_languages (crew_id, language) VALUES
(18,'Turkish'), (18,'English'),
(19,'Turkish'),
(20,'Turkish'), (20,'English'),
(21,'Turkish'),
(22,'German'), (22,'English');

-- =====================================================
-- AIRBUS A330 CREW (EXISTING)
-- IDs: 23 to 27
-- =====================================================
INSERT INTO cabin_crew (name, age, gender, nationality, attendant_type, seniority_level)
VALUES
('Cansu Erdem', 44, 'FEMALE', 'Turkish', 'CHIEF', 'SENIOR'),
('Alessandro Ricci', 37, 'MALE', 'Italian', 'CHEF', 'SENIOR'),
('Deniz Yaman', 33, 'MALE', 'Turkish', 'REGULAR', 'JUNIOR'),
('Helena Novak', 41, 'FEMALE', 'Czech', 'REGULAR', 'SENIOR'),
('Mehmet Korkmaz', 29, 'MALE', 'Turkish', 'REGULAR', 'JUNIOR');

-- Vehicle Restrictions for IDs 23-27 (Assuming A330)
INSERT INTO attendant_vehicle_restrictions (attendant_id, vehicle_type) VALUES
(23, 'AIRBUS_A330'),
(24, 'AIRBUS_A330'),
(25, 'AIRBUS_A330'),
(26, 'AIRBUS_A330'),
(27, 'AIRBUS_A330');

-- Languages for IDs 23-27
INSERT INTO crew_languages (crew_id, language) VALUES
(23,'Turkish'), (23,'English'),
(24,'Italian'), (24,'English'),
(25,'Turkish'),
(26,'Czech'), (26,'English'),
(27,'Turkish'), (27,'English');

-- Recipes for Chef (ID 24)
INSERT INTO crew_dish_recipes (crew_id, dish_name) VALUES
(24, 'PASTA'), (24, 'LASAGNA');

-- =====================================================
-- BOEING 787 / BOEING 777 (LONG RANGE) (EXISTING)
-- IDs: 28 to 32
-- =====================================================
INSERT INTO cabin_crew (name, age, gender, nationality, attendant_type, seniority_level)
VALUES
('Hakan Şimşek', 48, 'MALE', 'Turkish', 'CHIEF', 'SENIOR'),
('Yuki Nakamura', 36, 'FEMALE', 'Japanese', 'REGULAR', 'SENIOR'),
('Fatma Aslan', 32, 'FEMALE', 'Turkish', 'REGULAR', 'JUNIOR'),
('Pierre Laurent', 45, 'MALE', 'French', 'REGULAR', 'SENIOR'),
('Giovanni Russo', 40, 'MALE', 'Italian', 'CHEF', 'SENIOR');

-- Vehicle Restrictions for IDs 28-32
INSERT INTO attendant_vehicle_restrictions (attendant_id, vehicle_type) VALUES
(28, 'BOEING_787'), (28, 'BOEING_777'),
(29, 'BOEING_787'), (29, 'BOEING_777'),
(30, 'BOEING_787'), (30, 'BOEING_777'),
(31, 'BOEING_787'), (31, 'BOEING_777'),
(32, 'BOEING_787'), (32, 'BOEING_777');

-- Languages for IDs 28-32
INSERT INTO crew_languages (crew_id, language) VALUES
(28,'Turkish'), (28,'English'),
(29,'Japanese'), (29,'English'),
(30,'Turkish'),
(31,'French'), (31,'English'),
(32,'Italian'), (32,'English');

-- Recipes for Chef (ID 32)
INSERT INTO crew_dish_recipes (crew_id, dish_name) VALUES
(32, 'RISOTTO'), (32, 'PIZZA');


-- =====================================================
-- NEW DATA: ADDITIONAL REGULAR CREW (To meet min 6 regular rule)
-- We need more REGULAR staff compatible with various planes.
-- =====================================================

-- New Batch for AIRBUS A320 / BOEING 737 (Adding 4 Regulars)
-- IDs: 33 to 36
INSERT INTO cabin_crew (name, age, gender, nationality, attendant_type, seniority_level)
VALUES
('Emily White', 25, 'FEMALE', 'UK', 'REGULAR', 'JUNIOR'),
('Carlos Rodriguez', 29, 'MALE', 'Spanish', 'REGULAR', 'JUNIOR'),
('Aylin Koçak', 23, 'FEMALE', 'Turkish', 'REGULAR', 'TRAINEE'),
('Klaus Weber', 34, 'MALE', 'German', 'REGULAR', 'SENIOR');

INSERT INTO attendant_vehicle_restrictions (attendant_id, vehicle_type) VALUES
(33, 'AIRBUS_A320'), (33, 'BOEING_737'),
(34, 'AIRBUS_A320'), (34, 'BOEING_737'),
(35, 'AIRBUS_A320'), (35, 'BOEING_737'),
(36, 'AIRBUS_A320'), (36, 'BOEING_737');

INSERT INTO crew_languages (crew_id, language) VALUES
(33, 'English'),
(34, 'Spanish'), (34, 'English'),
(35, 'Turkish'), (35, 'English'),
(36, 'German'), (36, 'English');


-- New Batch for AIRBUS A330 (Adding 4 Regulars)
-- IDs: 37 to 40
INSERT INTO cabin_crew (name, age, gender, nationality, attendant_type, seniority_level)
VALUES
('Isabella Silva', 27, 'FEMALE', 'Brazilian', 'REGULAR', 'JUNIOR'),
('Murat Demirci', 30, 'MALE', 'Turkish', 'REGULAR', 'JUNIOR'),
('Anna Kowalska', 32, 'FEMALE', 'Polish', 'REGULAR', 'SENIOR'),
('David Chen', 26, 'MALE', 'Chinese', 'REGULAR', 'TRAINEE');

INSERT INTO attendant_vehicle_restrictions (attendant_id, vehicle_type) VALUES
(37, 'AIRBUS_A330'),
(38, 'AIRBUS_A330'),
(39, 'AIRBUS_A330'),
(40, 'AIRBUS_A330');

INSERT INTO crew_languages (crew_id, language) VALUES
(37, 'Portuguese'), (37, 'English'),
(38, 'Turkish'),
(39, 'Polish'), (39, 'English'),
(40, 'Chinese'), (40, 'English');


-- New Batch for BOEING 777 / 787 (Adding 4 Regulars)
-- IDs: 41 to 44
INSERT INTO cabin_crew (name, age, gender, nationality, attendant_type, seniority_level)
VALUES
('Elena Popov', 28, 'FEMALE', 'Russian', 'REGULAR', 'JUNIOR'),
('Hassan Al-Sayed', 35, 'MALE', 'Egyptian', 'REGULAR', 'SENIOR'),
('Julia Becker', 24, 'FEMALE', 'German', 'REGULAR', 'TRAINEE'),
('Omar Faruq', 31, 'MALE', 'Turkish', 'REGULAR', 'JUNIOR');

INSERT INTO attendant_vehicle_restrictions (attendant_id, vehicle_type) VALUES
(41, 'BOEING_777'), (41, 'BOEING_787'),
(42, 'BOEING_777'), (42, 'BOEING_787'),
(43, 'BOEING_777'), (43, 'BOEING_787'),
(44, 'BOEING_777'), (44, 'BOEING_787');

INSERT INTO crew_languages (crew_id, language) VALUES
(41, 'Russian'), (41, 'English'),
(42, 'Arabic'), (42, 'English'),
(43, 'German'), (43, 'English'),
(44, 'Turkish'), (44, 'English');

-- =====================================================
-- COMPLETING PREVIOUS BATCH: LANGUAGES (IDs 168-185)
-- =====================================================
INSERT INTO crew_languages (crew_id, language) VALUES
(168, 'Greek'), (168, 'English'),
(169, 'Hindi'), (169, 'English'),
(170, 'French'), (170, 'English'), (170, 'Dutch'),
(171, 'Czech'), (171, 'English'),
(172, 'Italian'), (172, 'English'),
(173, 'Japanese'), (173, 'English'),
(174, 'French'), (174, 'English'),
(175, 'Spanish'), (175, 'English'),
(176, 'Turkish'), (176, 'English'),
(177, 'Chinese'), (177, 'English'),
(178, 'Hindi'), (178, 'English'),
(179, 'Arabic'), (179, 'French'),
(180, 'Italian'), (180, 'English'),
(181, 'French'), (181, 'English'),
(182, 'Spanish'), (182, 'English'),
(183, 'Japanese'), (183, 'English'),
(184, 'Turkish'), (184, 'English'),
(185, 'Turkish'), (185, 'English');


-- =====================================================
-- MASSIVE DATA EXPANSION: BALANCED TYPES (IDs 186-250)
-- Focusing on equal distribution of CHIEF, CHEF, REGULAR
-- =====================================================

-- =====================================================
-- BATCH 8: NEW CHIEFS (22 PEOPLE)
-- ID Range: 186 - 207
-- =====================================================
INSERT INTO cabin_crew (name, age, gender, nationality, attendant_type, seniority_level) VALUES
('Amara Diop', 40, 'FEMALE', 'Senegal', 'CHIEF', 'SENIOR'),
('Katarina Petrovic', 38, 'FEMALE', 'Serbia', 'CHIEF', 'SENIOR'),
('Tariq Al-Mansoor', 45, 'MALE', 'UAE', 'CHIEF', 'SENIOR'),
('Julian Weber', 42, 'MALE', 'Germany', 'CHIEF', 'SENIOR'),
('Chloe Dubois', 39, 'FEMALE', 'France', 'CHIEF', 'SENIOR'),
('Matteo Ricci', 41, 'MALE', 'Italian', 'CHIEF', 'SENIOR'),
('Xiang Liu', 43, 'MALE', 'China', 'CHIEF', 'SENIOR'),
('Sofia Morales', 37, 'FEMALE', 'Spain', 'CHIEF', 'SENIOR'),
('Igor Volkov', 46, 'MALE', 'Russia', 'CHIEF', 'SENIOR'),
('Zahra Khan', 38, 'FEMALE', 'Pakistan', 'CHIEF', 'SENIOR'),
('Lars Jensen', 44, 'MALE', 'Denmark', 'CHIEF', 'SENIOR'),
('Elena Popova', 40, 'FEMALE', 'Russia', 'CHIEF', 'SENIOR'),
('Rafael Costa', 42, 'MALE', 'Brazil', 'CHIEF', 'SENIOR'),
('Yasmin Fawaz', 36, 'FEMALE', 'Egypt', 'CHIEF', 'SENIOR'),
('Oliver Grant', 45, 'MALE', 'UK', 'CHIEF', 'SENIOR'),
('Hannah Schmidt', 39, 'FEMALE', 'German', 'CHIEF', 'SENIOR'),
('Kenji Yamamoto', 47, 'MALE', 'Japanese', 'CHIEF', 'SENIOR'),
('Maria Fernandez', 41, 'FEMALE', 'Argentina', 'CHIEF', 'SENIOR'),
('David O Brien', 44, 'MALE', 'Ireland', 'CHIEF', 'SENIOR'),
('Fatima Demir', 38, 'FEMALE', 'Turkey', 'CHIEF', 'SENIOR'),
('Hakan Yılmaz', 45, 'MALE', 'Turkey', 'CHIEF', 'SENIOR'),
('Seda Kaya', 39, 'FEMALE', 'Turkey', 'CHIEF', 'SENIOR');

-- Vehicle Restrictions for Chiefs
INSERT INTO attendant_vehicle_restrictions (attendant_id, vehicle_type) VALUES
(186, 'BOEING_787'), (186, 'AIRBUS_A330'),
(187, 'BOEING_777'), (187, 'BOEING_737'),
(188, 'AIRBUS_A320'), (188, 'BOEING_777'),
(189, 'AIRBUS_A330'), (189, 'BOEING_787'),
(190, 'BOEING_777'), (190, 'AIRBUS_A320'),
(191, 'AIRBUS_A330'), (191, 'BOEING_737'),
(192, 'BOEING_787'), (192, 'BOEING_777'),
(193, 'AIRBUS_A320'), (193, 'AIRBUS_A330'),
(194, 'BOEING_737'), (194, 'BOEING_777'),
(195, 'BOEING_787'), (195, 'AIRBUS_A330'),
(196, 'BOEING_777'), (196, 'AIRBUS_A320'),
(197, 'AIRBUS_A330'), (197, 'BOEING_737'),
(198, 'BOEING_787'), (198, 'BOEING_777'),
(199, 'AIRBUS_A320'), (199, 'AIRBUS_A330'),
(200, 'BOEING_737'), (200, 'BOEING_777'),
(201, 'BOEING_787'), (201, 'AIRBUS_A330'),
(202, 'BOEING_777'), (202, 'AIRBUS_A320'),
(203, 'AIRBUS_A330'), (203, 'BOEING_737'),
(204, 'BOEING_787'), (204, 'BOEING_777'),
(205, 'AIRBUS_A320'), (205, 'AIRBUS_A330'),
(206, 'BOEING_777'), (206, 'BOEING_787'),
(207, 'AIRBUS_A330'), (207, 'AIRBUS_A320');

-- Languages for Chiefs
INSERT INTO crew_languages (crew_id, language) VALUES
(186, 'French'), (186, 'English'),
(187, 'Serbian'), (187, 'English'),
(188, 'Arabic'), (188, 'English'),
(189, 'German'), (189, 'English'),
(190, 'French'), (190, 'English'),
(191, 'Italian'), (191, 'English'),
(192, 'Chinese'), (192, 'English'),
(193, 'Spanish'), (193, 'English'),
(194, 'Russian'), (194, 'English'),
(195, 'Urdu'), (195, 'English'),
(196, 'Danish'), (196, 'English'),
(197, 'Russian'), (197, 'English'),
(198, 'Portuguese'), (198, 'English'),
(199, 'Arabic'), (199, 'English'),
(200, 'English'),
(201, 'German'), (201, 'English'),
(202, 'Japanese'), (202, 'English'),
(203, 'Spanish'), (203, 'English'),
(204, 'English'), (204, 'Irish'),
(205, 'Turkish'), (205, 'English'),
(206, 'Turkish'), (206, 'English'),
(207, 'Turkish'), (207, 'English');


-- =====================================================
-- BATCH 9: NEW CHEFS (21 PEOPLE)
-- ID Range: 208 - 228
-- =====================================================
INSERT INTO cabin_crew (name, age, gender, nationality, attendant_type, seniority_level) VALUES
('Dominique Strauss', 48, 'MALE', 'French', 'CHEF', 'SENIOR'),
('Mario Batali', 50, 'MALE', 'Italian', 'CHEF', 'SENIOR'),
('Nobu Matsuhisa', 55, 'MALE', 'Japanese', 'CHEF', 'SENIOR'),
('Jamie Oliver', 45, 'MALE', 'UK', 'CHEF', 'SENIOR'),
('Burak Özdemir', 30, 'MALE', 'Turkish', 'CHEF', 'SENIOR'),
('Nusret Gokce', 38, 'MALE', 'Turkish', 'CHEF', 'SENIOR'),
('Massimo Bottura', 52, 'MALE', 'Italian', 'CHEF', 'SENIOR'),
('Heston Blumenthal', 54, 'MALE', 'UK', 'CHEF', 'SENIOR'),
('Alain Ducasse', 60, 'MALE', 'French', 'CHEF', 'SENIOR'),
('Wolfgang Puck', 65, 'MALE', 'Austrian', 'CHEF', 'SENIOR'),
('Julia Child', 55, 'FEMALE', 'American', 'CHEF', 'SENIOR'),
('Anthony Bourdain', 50, 'MALE', 'American', 'CHEF', 'SENIOR'),
('Sanjeev Kapoor', 52, 'MALE', 'Indian', 'CHEF', 'SENIOR'),
('Vikas Khanna', 48, 'MALE', 'Indian', 'CHEF', 'SENIOR'),
('Gaggan Anand', 42, 'MALE', 'Thai', 'CHEF', 'SENIOR'),
('Rene Redzepi', 44, 'MALE', 'Danish', 'CHEF', 'SENIOR'),
('Ferran Adria', 58, 'MALE', 'Spanish', 'CHEF', 'SENIOR'),
('Joan Roca', 56, 'MALE', 'Spanish', 'CHEF', 'SENIOR'),
('Alex Atala', 52, 'MALE', 'Brazilian', 'CHEF', 'SENIOR'),
('Gaston Acurio', 53, 'MALE', 'Peruvian', 'CHEF', 'SENIOR'),
('Mehmet Gürs', 45, 'MALE', 'Turkish', 'CHEF', 'SENIOR');

-- Vehicle Restrictions for Chefs
INSERT INTO attendant_vehicle_restrictions (attendant_id, vehicle_type) VALUES
(208, 'BOEING_777'), (208, 'AIRBUS_A330'),
(209, 'AIRBUS_A330'), (209, 'BOEING_787'),
(210, 'BOEING_787'), (210, 'BOEING_777'),
(211, 'AIRBUS_A330'), (211, 'BOEING_777'),
(212, 'BOEING_777'), (212, 'AIRBUS_A330'),
(213, 'BOEING_787'), (213, 'BOEING_777'),
(214, 'AIRBUS_A330'), (214, 'AIRBUS_A320'),
(215, 'BOEING_777'), (215, 'BOEING_787'),
(216, 'AIRBUS_A330'), (216, 'BOEING_777'),
(217, 'BOEING_787'), (217, 'AIRBUS_A330'),
(218, 'BOEING_777'), (218, 'AIRBUS_A320'),
(219, 'AIRBUS_A330'), (219, 'BOEING_787'),
(220, 'BOEING_777'), (220, 'AIRBUS_A330'),
(221, 'BOEING_787'), (221, 'BOEING_777'),
(222, 'AIRBUS_A330'), (222, 'AIRBUS_A320'),
(223, 'BOEING_777'), (223, 'BOEING_787'),
(224, 'AIRBUS_A330'), (224, 'BOEING_777'),
(225, 'BOEING_787'), (225, 'AIRBUS_A330'),
(226, 'BOEING_777'), (226, 'AIRBUS_A320'),
(227, 'AIRBUS_A330'), (227, 'BOEING_787'),
(228, 'BOEING_777'), (228, 'BOEING_787');

-- Languages for Chefs
INSERT INTO crew_languages (crew_id, language) VALUES
(208, 'French'), (208, 'English'),
(209, 'Italian'), (209, 'English'),
(210, 'Japanese'), (210, 'English'),
(211, 'English'),
(212, 'Turkish'), (212, 'English'),
(213, 'Turkish'), (213, 'English'),
(214, 'Italian'), (214, 'English'),
(215, 'English'),
(216, 'French'), (216, 'English'),
(217, 'German'), (217, 'English'),
(218, 'English'),
(219, 'English'),
(220, 'Hindi'), (220, 'English'),
(221, 'Hindi'), (221, 'English'),
(222, 'Thai'), (222, 'English'),
(223, 'Danish'), (223, 'English'),
(224, 'Spanish'), (224, 'English'),
(225, 'Spanish'), (225, 'English'),
(226, 'Portuguese'), (226, 'English'),
(227, 'Spanish'), (227, 'English'),
(228, 'Turkish'), (228, 'English'), (228, 'Swedish');

-- Recipes for Chefs
INSERT INTO crew_dish_recipes (crew_id, dish_name) VALUES
(208, 'ONION_SOUP'), (208, 'BEEF_STEW'),
(209, 'PASTA'), (209, 'LASAGNA'),
(210, 'SUSHI_PLATTER'), (210, 'TEMPURA'),
(211, 'FISH_AND_CHIPS'), (211, 'BEEF_STEW'),
(212, 'KEBAB'), (212, 'BAKLAVA'),
(213, 'STEAK'), (213, 'BURGER'),
(214, 'RISOTTO'), (214, 'TIRAMISU'),
(215, 'CHOCOLATE_MOUSSE'), (215, 'LOBSTER'),
(216, 'DUCK_CONFIT'), (216, 'RATATOUILLE'),
(217, 'SCHNITZEL'), (217, 'APPLE_STRUDEL'),
(218, 'ROAST_CHICKEN'), (218, 'APPLE_PIE'),
(219, 'STEAK'), (219, 'FRIES'),
(220, 'CURRY'), (220, 'BIRYANI'),
(221, 'TIKKA_MASALA'), (221, 'NAAN_BREAD'),
(222, 'PAD_THAI'), (222, 'GREEN_CURRY'),
(223, 'SMORREBROD'), (223, 'MEATBALLS'),
(224, 'PAELLA'), (224, 'GAZPACHO'),
(225, 'TAPAS'), (225, 'CHURROS'),
(226, 'FEIJOADA'), (226, 'CHURRASCO'),
(227, 'CEVICHE'), (227, 'LOMO_SALTADO'),
(228, 'KEBAB'), (228, 'MEZE_PLATTER');


-- =====================================================
-- BATCH 10: NEW REGULARS (22 PEOPLE)
-- ID Range: 229 - 250
-- =====================================================
INSERT INTO cabin_crew (name, age, gender, nationality, attendant_type, seniority_level) VALUES
('Canan Yılmaz', 24, 'FEMALE', 'Turkey', 'REGULAR', 'TRAINEE'),
('Mehmet Öztürk', 26, 'MALE', 'Turkey', 'REGULAR', 'JUNIOR'),
('Elif Kaya', 29, 'FEMALE', 'Turkey', 'REGULAR', 'SENIOR'),
('Ali Demir', 23, 'MALE', 'Turkey', 'REGULAR', 'TRAINEE'),
('Ayşe Çelik', 27, 'FEMALE', 'Turkey', 'REGULAR', 'JUNIOR'),
('Mustafa Şahin', 30, 'MALE', 'Turkey', 'REGULAR', 'SENIOR'),
('Fatma Yıldız', 25, 'FEMALE', 'Turkey', 'REGULAR', 'JUNIOR'),
('Ahmet Arslan', 28, 'MALE', 'Turkey', 'REGULAR', 'SENIOR'),
('Emine Polat', 22, 'FEMALE', 'Turkey', 'REGULAR', 'TRAINEE'),
('Yusuf Doğan', 31, 'MALE', 'Turkey', 'REGULAR', 'SENIOR'),
('Zeynep Koç', 26, 'FEMALE', 'Turkey', 'REGULAR', 'JUNIOR'),
('Ömer Aydın', 24, 'MALE', 'Turkey', 'REGULAR', 'TRAINEE'),
('Hatice Özkan', 29, 'FEMALE', 'Turkey', 'REGULAR', 'SENIOR'),
('İbrahim Çetin', 27, 'MALE', 'Turkey', 'REGULAR', 'JUNIOR'),
('Sultan Erdem', 32, 'FEMALE', 'Turkey', 'REGULAR', 'SENIOR'),
('Ramazan Aslan', 25, 'MALE', 'Turkey', 'REGULAR', 'JUNIOR'),
('Esra Kara', 23, 'FEMALE', 'Turkey', 'REGULAR', 'TRAINEE'),
('Halil İbrahim', 28, 'MALE', 'Turkey', 'REGULAR', 'SENIOR'),
('Hacer Kurt', 26, 'FEMALE', 'Turkey', 'REGULAR', 'JUNIOR'),
('Osman Yavuz', 30, 'MALE', 'Turkey', 'REGULAR', 'SENIOR'),
('Gülcan Şen', 24, 'FEMALE', 'Turkey', 'REGULAR', 'TRAINEE'),
('Murat Aksoy', 29, 'MALE', 'Turkey', 'REGULAR', 'SENIOR');

-- Vehicle Restrictions for Regulars
INSERT INTO attendant_vehicle_restrictions (attendant_id, vehicle_type) VALUES
(229, 'BOEING_737'),
(230, 'AIRBUS_A320'),
(231, 'BOEING_777'), (231, 'BOEING_787'),
(232, 'AIRBUS_A330'),
(233, 'BOEING_737'), (233, 'AIRBUS_A320'),
(234, 'BOEING_777'), (234, 'AIRBUS_A330'),
(235, 'BOEING_787'), (235, 'BOEING_777'),
(236, 'AIRBUS_A330'), (236, 'AIRBUS_A320'),
(237, 'BOEING_737'),
(238, 'BOEING_777'), (238, 'BOEING_787'),
(239, 'AIRBUS_A320'),
(240, 'AIRBUS_A330'),
(241, 'BOEING_737'), (241, 'BOEING_777'),
(242, 'AIRBUS_A320'), (242, 'AIRBUS_A330'),
(243, 'BOEING_787'),
(244, 'BOEING_777'), (244, 'AIRBUS_A330'),
(245, 'BOEING_737'),
(246, 'AIRBUS_A320'), (246, 'BOEING_787'),
(247, 'AIRBUS_A330'), (247, 'BOEING_777'),
(248, 'BOEING_777'),
(249, 'AIRBUS_A320'),
(250, 'BOEING_787'), (250, 'BOEING_777');

-- Languages for Regulars
INSERT INTO crew_languages (crew_id, language) VALUES
(229, 'Turkish'), (229, 'English'),
(230, 'Turkish'), (230, 'English'),
(231, 'Turkish'), (231, 'English'),
(232, 'Turkish'), (232, 'English'),
(233, 'Turkish'), (233, 'English'),
(234, 'Turkish'), (234, 'English'),
(235, 'Turkish'), (235, 'English'),
(236, 'Turkish'), (236, 'English'),
(237, 'Turkish'), (237, 'English'),
(238, 'Turkish'), (238, 'English'),
(239, 'Turkish'), (239, 'English'),
(240, 'Turkish'), (240, 'English'),
(241, 'Turkish'), (241, 'English'),
(242, 'Turkish'), (242, 'English'),
(243, 'Turkish'), (243, 'English'),
(244, 'Turkish'), (244, 'English'),
(245, 'Turkish'), (245, 'English'),
(246, 'Turkish'), (246, 'English'),
(247, 'Turkish'), (247, 'English'),
(248, 'Turkish'), (248, 'English'),
(249, 'Turkish'), (249, 'English'),
(250, 'Turkish'), (250, 'English');

INSERT INTO cabin_crew (name, age, gender, nationality, attendant_type, seniority_level) VALUES
('Lina Andersson', 28, 'FEMALE', 'Sweden', 'REGULAR', 'JUNIOR'),
('Erik Johansson', 35, 'MALE', 'Sweden', 'REGULAR', 'SENIOR'),
('Marta Nowak', 26, 'FEMALE', 'Poland', 'REGULAR', 'TRAINEE'),
('Piotr Zielinski', 31, 'MALE', 'Poland', 'REGULAR', 'JUNIOR'),
('Ana Popescu', 34, 'FEMALE', 'Romania', 'REGULAR', 'SENIOR'),
('Bogdan Ionescu', 29, 'MALE', 'Romania', 'REGULAR', 'JUNIOR'),
('Lucia Ferraro', 27, 'FEMALE', 'Italy', 'REGULAR', 'JUNIOR'),
('Marco De Luca', 36, 'MALE', 'Italy', 'REGULAR', 'SENIOR'),
('Sofia Alvarez', 25, 'FEMALE', 'Spain', 'REGULAR', 'TRAINEE'),
('Diego Morales', 33, 'MALE', 'Spain', 'REGULAR', 'SENIOR'),

('Emily Carter', 28, 'FEMALE', 'UK', 'REGULAR', 'JUNIOR'),
('James Miller', 39, 'MALE', 'UK', 'REGULAR', 'SENIOR'),
('Chantal Moreau', 32, 'FEMALE', 'France', 'REGULAR', 'SENIOR'),
('Louis Bernard', 24, 'MALE', 'France', 'REGULAR', 'TRAINEE'),
('Hannah Fischer', 30, 'FEMALE', 'Germany', 'REGULAR', 'JUNIOR'),
('Jonas Richter', 42, 'MALE', 'Germany', 'REGULAR', 'SENIOR'),
('Eva Novak', 29, 'FEMALE', 'Czech', 'REGULAR', 'JUNIOR'),
('Tomas Dvorak', 34, 'MALE', 'Czech', 'REGULAR', 'SENIOR'),
('Nina Horvat', 27, 'FEMALE', 'Croatia', 'REGULAR', 'JUNIOR'),
('Ivan Kovac', 38, 'MALE', 'Croatia', 'REGULAR', 'SENIOR'),

('Aisha Rahman', 31, 'FEMALE', 'Malaysia', 'REGULAR', 'SENIOR'),
('Farid Hassan', 26, 'MALE', 'Morocco', 'REGULAR', 'JUNIOR'),
('Leila Ben Ali', 23, 'FEMALE', 'Tunisia', 'REGULAR', 'TRAINEE'),
('Omar Haddad', 35, 'MALE', 'Jordan', 'REGULAR', 'SENIOR'),
('Yara Khalil', 28, 'FEMALE', 'Lebanon', 'REGULAR', 'JUNIOR'),

('Min Seo', 24, 'FEMALE', 'South Korea', 'REGULAR', 'TRAINEE'),
('Jae Park', 33, 'MALE', 'South Korea', 'REGULAR', 'SENIOR'),
('Mei Lin', 29, 'FEMALE', 'China', 'REGULAR', 'JUNIOR'),
('Chen Wei', 41, 'MALE', 'China', 'REGULAR', 'SENIOR'),
('Nguyen Thi Hoa', 26, 'FEMALE', 'Vietnam', 'REGULAR', 'JUNIOR'),
('Tran Minh', 37, 'MALE', 'Vietnam', 'REGULAR', 'SENIOR'),

('Paula Mendes', 28, 'FEMALE', 'Portugal', 'REGULAR', 'JUNIOR'),
('Ricardo Silva', 44, 'MALE', 'Portugal', 'REGULAR', 'SENIOR'),
('Camila Rojas', 25, 'FEMALE', 'Chile', 'REGULAR', 'TRAINEE'),
('Andres Gutierrez', 34, 'MALE', 'Colombia', 'REGULAR', 'SENIOR'),

('Zanele Nkosi', 31, 'FEMALE', 'South Africa', 'REGULAR', 'SENIOR'),
('Sipho Dlamini', 27, 'MALE', 'South Africa', 'REGULAR', 'JUNIOR');
