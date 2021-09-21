const mapDBToModel = ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  created_at,
  updated_at,
}) => ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  insertedAt: created_at,
  updatedAt: updated_at,
});

const mapDBToPlaylist = ({
  id,
  name,
  owner,

}) => ({
  id,
  name,
  username: owner,
});

const mapDBToPlaylistSongs = ({
  id,
  title,
  performer,

}) => ({
  id,
  title,
  performer,
});

module.exports = { mapDBToModel, mapDBToPlaylist, mapDBToPlaylistSongs };
