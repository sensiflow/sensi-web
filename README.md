# sensi-web

## Environment variables

| Name                  | Description                                    | Default value                  |
|-----------------------|------------------------------------------------|--------------------------------|
| `API_URL`             | URL of the API                                 | `http://localhost:8080/api/v1` |
| `RTSP_PORT`           | Port of the RTSP server                        | `8554`                         |
| `HLS_PORT`            | Port of the HLS server                         | `8080`                         |
| `RTSPS_PORT`          | Port of the RTSPS server                       | `8443`                         |
| `MEDIA_READ_USER`     | Username to read streams from the Media server | `user`                         |
| `MEDIA_READ_PASSWORD` | Password to read streams from the Media server | `user`                         |


These environment variables can be set in the `.env.example` file.
Make a copy of this file and rename it to `.env` to set your own values so that they don't get pushed to the repository.
This also requires you to change the `webpack.config.js` file to use the `.env` file instead of the `.env.example` file.
