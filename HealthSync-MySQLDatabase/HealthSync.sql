DROP DATABASE IF EXISTS HealthSync;
CREATE DATABASE HealthSync;
USE HealthSync;
DROP TABLE IF EXISTS Appointment;
DROP TABLE IF EXISTS Patient;

CREATE TABLE Patient (
    patient_ID INT PRIMARY KEY NOT NULL,
    patient_name VARCHAR(100),
    doctors_name VARCHAR(100),
    severity INT NOT NULL
);

CREATE TABLE Appointment (
    appointment_ID INT PRIMARY KEY AUTO_INCREMENT,
    patient_ID INT,
    appointment_date DATE,
    FOREIGN KEY (patient_ID) REFERENCES Patient(patient_ID)
);

-- Temporary Variable table for saving date of shifter entry 
/*
CREATE TABLE temp_dates (
	patient_ID INT,
    next_available_date DATE
);
*/

/****************************************************************************************************
* TRIGGER: after_insert_patient
* Description: assign earliest available date for an appointment depending on severe levels 
* 			   Patients with higher severe levels need to be treated earlier
* 			   NOT YET IMPLEMENTED: Patients with severity < 10 will increase severe levels if they have been rescheduled to a later day. 
			   ^This can potentially become an O(n^2) insertion if we need to check for double bookings 
* 			   NOT YET IMPLEMENTED: Referal Logic priority
*****************************************************************************************************
*/
DELIMITER //
CREATE TRIGGER after_insert_patient
AFTER INSERT ON Patient
FOR EACH ROW
BEGIN
    DECLARE next_available_date DATE;
    DECLARE done INT DEFAULT 0;
    DECLARE new_severity INT;
	DECLARE existing_severity INT;
    DECLARE doctor_note VARCHAR(100);
    DECLARE referred_patient VARCHAR(100);

    
    SET next_available_date = CURDATE() + INTERVAL 1 DAY;  -- Start with tomorrow's date
    SET new_severity = NEW.severity; -- Store the severity of the new patient
    SET doctor_note = NEW.doctors_name;
	/*Find the next available appointment date*/
    -- If there exists an appointment on this date, AND the severity of INSERT is less, then increment to next day 
    WHILE done = 0 DO
		IF EXISTS ( SELECT 1 FROM Appointment app -- If there exists an appointment on this date
					WHERE app.appointment_date = next_available_date ) 
        THEN
				-- Check the severity of existing patient
				SELECT severity, doctors_name INTO existing_severity, referred_patient FROM Patient
                WHERE patient_ID IN (SELECT patient_ID FROM Appointment 
									 WHERE appointment_date = next_available_date);
				
                -- IF new_severity is greater => Shift ALL appointments in future by ONE day later
				IF (new_severity > existing_severity) THEN
					-- move the dates over once
                    UPDATE Appointment
                    SET appointment_date = appointment_date + INTERVAL 1 DAY
                    WHERE appointment_date >= next_available_date AND appointment_ID > 0;
                    /*
                    -- hand over id and date of appointment of person who cut in line to increase future date's severity
					DELETE FROM temp_dates WHERE patient_ID = NEW.patient_ID;
                    INSERT INTO temp_dates (patient_ID, next_available_date) VALUES (NEW.patient_ID, next_available_date); 
					*/
                    SET done = 1;					
                ELSE -- else move to next date and increment each severity < 10 by 1
					SET next_available_date = next_available_date + INTERVAL 1 DAY;
                END IF;
		ELSE -- earliest date is open finish the loop
			SET done = 1;
        END IF;
    END WHILE;
    
    -- Insert the appointment with the available date for the new patient
    INSERT INTO Appointment (patient_ID, appointment_date) 
    VALUES (NEW.patient_ID, next_available_date);
END //
/*
-- Trigger to increment the severeness of people who got rescheduled
-- Tracks the date of shifted appointment 

DELIMITER //
CREATE TRIGGER after_insert_appointment
AFTER INSERT ON Appointment 
FOR EACH ROW 
BEGIN 
	DECLARE cutt_in_line_date DATE;
    SELECT next_available_date INTO cutt_in_line_date FROM temp_dates
    WHERE patient_ID = NEW.patient_ID;	-- match to the line cutter
	if (cutt_in_line_date IS NOT NULL) THEN	-- if the date has not been applied again
		UPDATE Patient p 
		JOIN Appointment app 
		ON p.patient_ID = app.patient_ID
		SET p.severity = p.severity + 1
		WHERE p.severity < 10 AND app.patient_ID = NEW.patient_ID AND app.appointment_date > cutt_in_line_date;
	END IF;
END //
DELIMITER ;

*/
-- inserting Patient
INSERT INTO Patient (patient_ID, patient_name, severity) VALUES (100, 'Bob', 1);
INSERT INTO Patient (patient_ID, patient_name, severity, doctors_name) VALUES(101,"Marty GOT it", 3, 'Dr. Plug');
INSERT INTO Patient (patient_ID, patient_name, severity) VALUES(102,"John", 7);
INSERT INTO Patient (patient_ID, patient_name, severity) VALUES(103,"Sam", 5);
INSERT INTO Patient (patient_ID, patient_name, severity, doctors_name) VALUES(104,"IM DYING with referal", 10, 'Dr. Shatwani');
INSERT INTO Patient (patient_ID, patient_name, severity) VALUES(105,"IM Chillin", 1);
INSERT INTO Patient (patient_ID, patient_name, severity, doctors_name) VALUES(106,"IM :) with referal", 5, 'Dr. Shatwani');
INSERT INTO Patient (patient_ID, patient_name, severity) VALUES(107,"Samly", 10);
INSERT INTO Patient (patient_ID, patient_name, severity) VALUES(108,"IM late", 1);


SELECT p.patient_ID, p.patient_name, p.severity, app.appointment_date, p.doctors_name FROM Patient p
JOIN Appointment app
ON  p.patient_ID = app.patient_ID
ORDER BY app.appointment_date ASC;