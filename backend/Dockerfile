FROM ruby:3.2.2

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app
RUN bundle install

CMD ["rails", "s", "-p", "3000", "-b", "0.0.0.0"]

EXPOSE 3000
