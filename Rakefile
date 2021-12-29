spec = Gem::Specification.find_by_name 'wax_tasks'
Dir.glob("#{spec.gem_dir}/lib/tasks/*.rake").each { |r| load r }

require 'html-proofer'

namespace :wax do
  desc 'run htmlproofer, rspec if .rspec file exists'
  task :test do
    opts = {
      check_external_hash: true,
      allow_hash_href: true,
      check_html: true,
      disable_external: false,
      external_only: false,
      empty_alt_ignore: true,
      only_4xx: true,
      verbose: true,
      assume_extension: true,
      http_status_ignore: [301],
      #
      # TYPHOEUS TESTING
      # :typhoeus => { 
      #   :followlocation => false 
      # },
      #
      # FALSE POSITIVES LIST
      url_ignore: ["https://dloc.com/collections/ibsrp", "https://dloc.com/collections/icirngfm", "https://dloc.com/results?q=Digital+Humanities"]
    }
    HTMLProofer.check_directory('./_site', opts).run
    system('bundle exec rspec') if File.exist?('.rspec')
  end
end

desc 'Publishing the website via rsync'


task :prod do
  puts 'First, let\'s build your site...'
  sh "jekyll build"
  puts "\n"
  puts 'Now let\'s publish it, hold on a sec...'
# personal server setup
  user = 'caribbea'
  server = 'caribbeandigitalnyc.net'
  path = '/home/caribbea/public_html/caridischo'
  sh "rsync -r -p -e \"ssh -p22\" _site/. #{user}@#{server}:#{path}"
  puts "\n"
  puts 'Bam! Your website is now published!'
  puts "\n"
end
