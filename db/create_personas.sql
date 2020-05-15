-- Run this to set up the postgresql database table
-- Should only need to be ran once

--Drop table(s) before making

DROP TABLE PERSONAS;

CREATE TABLE PERSONAS(
      PERSONA_ID                INT          NOT NULL,
      USERNAME                  VARCHAR(255) NOT NULL,
      PERSONA_NAME              VARCHAR(255) NOT NULL,
      NPC_FLAG                  BOOLEAN      NOT NULL,
      HEALTH                    INT,
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
      ATTACHMENT_NAME           VARCHAR(255),
      ATTACHMENT_LOCATION       VARCHAR(255),
      NOTES                     VARCHAR(255),
      INVENTORY                 VARCHAR(255),
      PRIMARY KEY (PERSONA_ID)
);
