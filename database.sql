
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "first_name" VARCHAR(80) NOT NULL,
    "last_name" VARCHAR(80) NOT NULL,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);



CREATE TABLE "reflection" (
	"id" SERIAL PRIMARY KEY,
	"user_id" int REFERENCES "user" NOT NULL,
	"time" DATE NOT NULL,
	"mood" int NOT NULL
);



CREATE TABLE "activity" (
	"id" SERIAL PRIMARY KEY,
	"activity_name" varchar(255) NOT NULL,
	"activity_icon" varchar(255) NULL,
	"user_id" int REFERENCES "user" NOT NULL
);



CREATE TABLE "relationship" (
	"id" SERIAL PRIMARY KEY,
	"name" varchar(255) NOT NULL,
	"relationship_to_user" varchar(255) NOT NULL,
	"relationship_icon" varchar(255) NULL,
	"user_id" int REFERENCES "user" NOT NULL
);



CREATE TABLE "reflection_relationship" (
	"id" SERIAL PRIMARY KEY,
	"relationship_id" int REFERENCES "relationship" NOT NULL,
	"reflection_id" int REFERENCES "reflection" NOT NULL
);



CREATE TABLE "reflection_activity" (
	"id" SERIAL PRIMARY KEY,
	"activity_id" int REFERENCES "activity" NOT NULL,
	"reflection_id" int REFERENCES "reflection" NOT NULL
);



CREATE TABLE "word" (
	"id" SERIAL PRIMARY KEY,
	"word_name" varchar(255) NOT NULL
);



CREATE TABLE "reflection_word" (
	"id" SERIAL PRIMARY KEY,
	"word_id" int REFERENCES "word" NOT NULL,
	"reflection_id" REFERENCES "reflection" int NOT NULL
);


