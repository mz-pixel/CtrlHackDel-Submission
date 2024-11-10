-- Drop tables if they exist
DROP TABLE IF EXISTS Patient;

-- Create Patient table
CREATE TABLE Patient (
    patient_ID INT PRIMARY KEY NOT NULL,
    patient_name VARCHAR(100),
    doctors_name VARCHAR(100),
    severity INT NOT NULL
);

INSERT INTO Patient (patient_ID, patient_name, severity) VALUES (100, 'Bob', 1);
INSERT INTO Patient (patient_ID, patient_name, severity, doctors_name) VALUES (101, 'Marty GOT it', 3, 'Dr. Plug');
INSERT INTO Patient (patient_ID, patient_name, severity) VALUES (102, 'John', 7);
INSERT INTO Patient (patient_ID, patient_name, severity) VALUES (103, 'Sam', 5);
INSERT INTO Patient (patient_ID, patient_name, severity, doctors_name) VALUES (104, 'IM DYING with referral', 10, 'Dr. Shatwani');
INSERT INTO Patient (patient_ID, patient_name, severity) VALUES (105, 'IM Chillin', 1);
INSERT INTO Patient (patient_ID, patient_name, severity, doctors_name) VALUES (106, 'IM :) with referral', 5, 'Dr. Shatwani');
INSERT INTO Patient (patient_ID, patient_name, severity) VALUES (107, 'Samly', 10);
INSERT INTO Patient (patient_ID, patient_name, severity) VALUES (108, 'IM late', 1);

-- Query to retrieve data
