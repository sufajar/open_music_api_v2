const routes = (handler) => [
  {
    method: 'POST',
    path: '/playlists/{playlistId}/songs',
    handler: handler.postPlaylistSongHandler,
    // postSongHandler hanya menerima dan menyimpan "satu" song.
    options: {
      auth: 'openmusicapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/playlists/{playlistId}/songs',
    handler: handler.getPlaylistSongsHandler, // getSongsHandler mengembalikan "banyak" song.
    options: {
      auth: 'openmusicapp_jwt',
    },
  },

  {
    method: 'DELETE',
    path: '/playlists/{playlistId}/songs',
    handler: handler.deletePlaylistSongByIdHandler,
    // deleteSongByIdHandler hanya menerima dan mengubah "satu" song.
    options: {
      auth: 'openmusicapp_jwt',
    },
  },
];

module.exports = routes;
