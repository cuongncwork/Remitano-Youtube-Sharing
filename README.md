# Youtube Video Sharing App

## Introduction

1. This project is a small web app for sharing YouTube videos.
   - User can view all shared videos without login.
   - User need to login if they want to share a youtube video or vote a video.

2. Key features:
   - Registration and login.
   - Sharing YouTube videos (Can't share if link doesn't exist).
   - Viewing a list of shared videos.
   - Vote/Un-vote a shared video.
   - Real-time notifications for new video shares.

3. Demo: Visit the page: http://34.41.83.23

## Prerequisites

1. Backend

  |   Ruby   |   Rails  |   MySQL  |   Redis  |
  | :------: | :------: | :------: | :------: |
  |   3.2.2  |   7.0.7  |   8.1.0  |   7.2.0  |

2. Frontend

  |    ReactJS    | React Bootstrap |       Node      |
  | :-----------: | :-------------: | :-------------: |
  |     18.2.0    |      2.8.0      |       >= 16     |

**Cross-platform: This project using Docker for development, so you can run this project anywhere.**

## Installation & Configuration

1. Install Docker Desktop: https://docs.docker.com/get-docker/
2. Clone repository: https://github.com/cuongncwork/Remitano-Youtube-Sharing
3. In the root folder of project, add .env file with content below:

```
RAILS_ENV=development
MYSQL_ROOT_PASSWORD=root@123
MYSQL_HOST=db

YT_API_KEY=AIzaSyDr1a2tBHGu_gsq4qJrdZS8_nvxBCvTRC4

REDIS_HOST=redis
REDIS_PORT=6379
REDIS_URL=redis://redis:6379/0

REACT_APP_BACKEND_URL=http://localhost:3000/api
REACT_APP_BACKEND_CABLE_URL=ws:localhost:3000/cable
```

4. Open Terminal, go to project, then run command:

```
docker volume create shared_volume
```
```
docker compose up --build -d
```

5. After build successfully, run commands:

```
docker compose run backend rails db:create
```
```
docker compose run backend rails db:migrate
```

6. Open [http://localhost:3001](http://localhost:3001) to view project in the browser.

## Run Test

- Run project with Docker, then run command:

```
docker exec -it backend sh
```
```
RAILS_ENV=test rspec
```

## Usage

1. View list shared videos
   - When user open website, list all shared videos will show. User can see all shared videos without login.

2. User login & registration:
   - Login form in the header of website, include Email field and Password field.
   - If the email does not exist in database, the user will be automatically registered and logged in based on the email and password entered.

3. Share a movie
   - Once logged in, click button "Share a movie" on top-right, website will navigate to share page.
   - Enter Youtube URL to Youtube URL input, then click Share.
   - Backend will check the validity of the URL you just entered. If the URL is not a valid Youtube URL, or Video is not available, an error notification will show.

4. Real-Time Notifications for new video shares:
   - When a user shares a new video, logged-in users will receive real-time notifications.
   - Notifications will appear as pop-ups on the bottom-right within the application.
   - The notification will include the video title and the email of the user who shared it.

5. Like/Dislike a Video
   - User can click on Like/Dislike button to reaction with the video, click again to remove Like/Dislike

## Deployment

1. Install Git, Docker on your server.

2. Clone repository in HOME folder.

3. Go to backend folder, run 2 commands to get SECRET_KEY_BASE and RAILS_MASTER_KEY.
```
rake secret
```
```
rails credentials:edit
```

4. In root folder of project, add .env file with content below:
```
RAILS_ENV=production
MYSQL_ROOT_PASSWORD=<your_mysql_root_password>
MYSQL_HOST=db
RAILS_LOG_TO_STDOUT=true
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_URL=redis://redis:6379/0
YT_API_KEY=AIzaSyDr1a2tBHGu_gsq4qJrdZS8_nvxBCvTRC4
SECRET_KEY_BASE=<your_secret_key_base>
RAILS_MASTER_KEY=<your_rails_master_key>
```

5. In frontend folder, add .env file with content below:
```
REACT_APP_BACKEND_URL=http://<your_server>:3000/api
REACT_APP_BACKEND_CABLE_URL=ws:<your_server>:3000/cable
```

6. Run command in root project:
```
docker volume create shared_volume
```
```
docker compose -f docker-compose.prod.yml up --build -d
```

7. After build successfully, run commands:
```
docker compose -f docker-compose.prod.yml run backend rails db:create
```
```
docker compose -f docker-compose.prod.yml run backend rails db:migrate
```

**Please make sure you opened ports 80 and 3000 on your server**

## Troubleshooting

**Any issues when run Docker, please double-check the .env file with content listed in [Installation & Configuration](#installation--configuration) or [Deployment](#deployment) section and make sure you followed the steps correctly**
