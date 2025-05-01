CREATE TABLE "videoData" (
	"id" serial PRIMARY KEY NOT NULL,
	"script" json NOT NULL,
	"audioFileUrl" varchar NOT NULL,
	"captions" json NOT NULL,
	"imageList" varchar[],
	"createdBy" varchar NOT NULL
);
