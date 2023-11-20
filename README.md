# [Advent of Code Slack](https://advent.bhacaz.com/)

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
bin/rails db:setup
```

## Run the server

```
bin/rails server
```

## Sidekiq and Cron bot

Sidekiq is configured to be embedded with puma.
The cron to publish change in the leaderboard is configured every 15 minutes.
see `config/schedule.yml`.

## Run test suite

```
bundle exec rspec
```
