const routes = (handler) => [
  {
    method: 'POST',
    path: '/playlists',
    handler: handler.postPlaylistHandler,
    // postSongHandler hanya menerima dan menyimpan "satu" song.
    options: {
      auth: 'openmusicapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/playlists',
    handler: handler.getPlaylistsHandler, // getSongsHandler mengembalikan "banyak" song.
    options: {
      auth: 'openmusicapp_jwt',
    },
  },

  {
    method: 'DELETE',
    path: '/playlists/{id}',
    handler: handler.deletePlaylistByIdHandler,
    // deleteSongByIdHandler hanya menerima dan mengubah "satu" song.
    options: {
      auth: 'openmusicapp_jwt',
    },
  },
];

module.exports = routes;
