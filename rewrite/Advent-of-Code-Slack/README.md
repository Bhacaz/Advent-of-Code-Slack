# Rails Template App

## Usage

```bash
curl -sL https://github.com/Bhacaz/rails_template_app/archive/main.tar.gz | tar xz
mv rails_template_app-main my_awesome_app
cd my_awesome_app
bundle install
bin/rails generate rename MyAwesomeApp
bin/setup
```

## Features

* Rails 8.0.0.beta1
* TailwindCSS + [Daisyui](https://gist.github.com/Bhacaz/db7124f379857c94d62c1c32f19d07de)
* Hotwire
  * turbo_power
  * hotwire-livereload
* RSpec
  * FactoryBot
  * Faker
* SolidQueue
  * Setup in dev
  * mission_control-jobs
