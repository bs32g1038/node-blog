-- Table: public.chapters

-- DROP TABLE public.chapters;

CREATE TABLE public.chapters
(
    id integer NOT NULL DEFAULT nextval('chapters_id_seq'::regclass) ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    title character varying(255) COLLATE pg_catalog."default",
    sum_words integer,
    novel_id integer,
    novel_id integer,
    index integer,
    fingerprint character varying(255) COLLATE pg_catalog."default",
    content text COLLATE pg_catalog."default",
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    CONSTRAINT chapters_pkey PRIMARY KEY (id),
    CONSTRAINT chapters_fingerprint_key UNIQUE (fingerprint)

)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.chapters
    OWNER to postgres;

-- Index: chapters__novel_id

-- DROP INDEX public.chapters__novel_id;

CREATE INDEX chapters__novel_id
    ON public.chapters USING btree
    (novel_id)
    TABLESPACE pg_default;

-- Index: chapters_index_novel_id

-- DROP INDEX public.chapters_index_novel_id;

CREATE INDEX chapters_index_novel_id
    ON public.chapters USING btree
    (index, novel_id)
    TABLESPACE pg_default;

-- Trigger: update_novels_sunm_words

-- DROP TRIGGER update_novels_sunm_words ON public.chapters;

CREATE TRIGGER update_novels_sunm_words
    AFTER INSERT
    ON public.chapters
    FOR EACH ROW
    EXECUTE PROCEDURE public.update_novels_sumwords_when_insert_chapter();



-- Table: public.novels

-- DROP TABLE public.novels;

CREATE TABLE public.novels
(
    id integer NOT NULL DEFAULT nextval('novels_id_seq'::regclass) ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    id integer NOT NULL DEFAULT nextval('novels_id_seq'::regclass),
    name character varying(255) COLLATE pg_catalog."default",
    fingerprint character varying(255) COLLATE pg_catalog."default",
    pic character varying(255) COLLATE pg_catalog."default",
    summary text COLLATE pg_catalog."default",
    author character varying(255) COLLATE pg_catalog."default",
    tag_id integer,
    sum_words integer,
    status boolean,
    is_deleted boolean,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    last_chapter_id integer,
    CONSTRAINT novels_pkey PRIMARY KEY (id),
    CONSTRAINT novels_fingerprint_key UNIQUE (fingerprint)

)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.novels
    OWNER to postgres;

-- Index: novels_index_id

-- DROP INDEX public.novels_index_id;

CREATE INDEX novels_index_id
    ON public.novels USING btree
    (id)
    TABLESPACE pg_default;


-- Table: public."user"

-- DROP TABLE public."user";

CREATE TABLE public."user"
(
    id integer NOT NULL DEFAULT nextval('user_id_seq'::regclass),
    nickname character varying(200) COLLATE pg_catalog."default" NOT NULL,
    account character varying(200) COLLATE pg_catalog."default" NOT NULL,
    email character varying(200) COLLATE pg_catalog."default" NOT NULL,
    password character varying(200) COLLATE pg_catalog."default" NOT NULL,
    avatar character varying(200) COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp(6) with time zone NOT NULL,
    updated_at timestamp(6) with time zone NOT NULL,
    CONSTRAINT user_pkey PRIMARY KEY (id),
    CONSTRAINT user_email_54dc62b2_uniq UNIQUE (email)

)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."user"
    OWNER to postgres;

-- Table: public.bookshelf

-- DROP TABLE public.bookshelf;

CREATE TABLE public.bookshelf
(
    novel_id integer NOT NULL,
    user_id integer,
    created_at timestamp(6) with time zone,
    updated_at timestamp(6) with time zone,
    id integer NOT NULL DEFAULT nextval('user_bookshelf_id_seq'::regclass),
    CONSTRAINT user_bookself_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.bookshelf
    OWNER to postgres;  