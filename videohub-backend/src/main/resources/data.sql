-- Adding the full-text searchable column for English
ALTER TABLE videos
    ADD COLUMN IF NOT EXISTS name_tsvector_ru tsvector
        GENERATED ALWAYS AS (to_tsvector('russian', name)) STORED;

ALTER TABLE videos
    ADD COLUMN IF NOT EXISTS description_tsvector_ru tsvector
    GENERATED ALWAYS AS (to_tsvector('russian', description)) STORED;

-- Adding GIN index for fast searching
CREATE INDEX IF NOT EXISTS name_tsvector_ru ON videos USING GIN (name_tsvector_ru);
CREATE INDEX IF NOT EXISTS description_tsvector_ru ON videos USING GIN (description_tsvector_ru);