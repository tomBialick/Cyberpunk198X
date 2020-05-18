-- Run this to set up the postgresql database table
-- Should only need to be ran once
-- TO DO add aspect support
-- TO DO fix health

--Drop table(s) before making

DROP TABLE PERSONAS;

CREATE TABLE PERSONAS(
      PERSONA_ID                INT          NOT NULL,
      USERNAME                  VARCHAR(255) NOT NULL,
      PERSONA_NAME              VARCHAR(255) NOT NULL,
      NPC_FLAG                  BOOLEAN      NOT NULL,
      CONSEQUENCE_MILD          BOOLEAN,
      CONSEQUENCE_MODERATE      BOOLEAN,
      CONSEQUENCE_SEVERE        BOOLEAN,
      PHYSICAL_STRESS_1         BOOLEAN,
      PHYSICAL_STRESS_2         BOOLEAN,
      PHYSICAL_STRESS_3         BOOLEAN,
      PHYSICAL_STRESS_4         BOOLEAN,
      MENTAL_STRESS_1           BOOLEAN,
      MENTAL_STRESS_2           BOOLEAN,
      MENTAL_STRESS_3           BOOLEAN,
      MENTAL_STRESS_4           BOOLEAN,
      HIGH_CONCEPT              VARCHAR(255),
      TROUBLE                   VARCHAR(255),
      ASPECT_1                  VARCHAR(255),
      ASPECT_2                  VARCHAR(255),
      ASPECT_3                  VARCHAR(255),
      SUPERB_SKILL              VARCHAR(255),
      GREAT_SKILL               VARCHAR(255),
      GOOD_SKILL_1              VARCHAR(255),
      GOOD_SKILL_2              VARCHAR(255),
      FAIR_SKILL_1              VARCHAR(255),
      FAIR_SKILL_2              VARCHAR(255),
      FAIR_SKILL_3              VARCHAR(255),
      AVERAGE_SKILL_1           VARCHAR(255),
      AVERAGE_SKILL_2           VARCHAR(255),
      AVERAGE_SKILL_3           VARCHAR(255),
      AVERAGE_SKILL_4           VARCHAR(255),
      STUNT_1                   VARCHAR(255),
      STUNT_2                   VARCHAR(255),
      STUNT_3                   VARCHAR(255),
      STUNT_4                   VARCHAR(255),
      STUNT_5                   VARCHAR(255),
      REFRESH                   INT,
      ATTACHMENT_NAME           VARCHAR(255),
      ATTACHMENT_LOCATION       VARCHAR(255),
      NOTES                     VARCHAR(255),
      INVENTORY                 VARCHAR(255),
      PRIMARY KEY (PERSONA_ID)
);
