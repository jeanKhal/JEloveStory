const path = require('path');

module.exports = {
  // Configuration pour réduire l'utilisation de mémoire
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxSize: 244000, // 244KB
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  
  // Configuration pour les images
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
              limit: 8192, // 8KB - les images plus grandes seront externalisées
            },
          },
        ],
      },
    ],
  },
  
  // Configuration pour réduire la taille du bundle
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
};
