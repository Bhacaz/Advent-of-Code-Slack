# Advent of Code Slack

Post new Advent of Code score of a private leaderboard on Slack.

![Slack post](https://user-images.githubusercontent.com/7858787/70275316-ea725880-177b-11ea-88c3-f27eec8afd19.png)

## Installation

```
rbenv install 2.7.2
gem install bundler
bundle install
```

## Init database

```
bundle exec rails db:create
bundle exec rails db:migrate
```

## Run the server

```
bundle exec rails server
bin/webpack-dev-server 
```

## Run sidekiq

```
redis-server
bundle exec sidekiq
```

## Run test suite

```
bundle exec rspec
```