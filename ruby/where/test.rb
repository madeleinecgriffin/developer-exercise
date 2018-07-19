require 'minitest/autorun'

class WhereTest < Minitest::Test

  def setup
    @boris   = {:name => 'Boris The Blade', :quote => "Heavy is good. Heavy is reliable. If it doesn't work you can always hit them.", :title => 'Snatch', :rank => 4}
    @charles = {:name => 'Charles De Mar', :quote => 'Go that way, really fast. If something gets in your way, turn.', :title => 'Better Off Dead', :rank => 3}
    @wolf    = {:name => 'The Wolf', :quote => 'I think fast, I talk fast and I need you guys to act fast if you wanna get out of this', :title => 'Pulp Fiction', :rank => 4}
    @glen    = {:name => 'Glengarry Glen Ross', :quote => "Put. That coffee. Down. Coffee is for closers only.",  :title => "Blake", :rank => 5}

    @fixtures = [@boris, @charles, @wolf, @glen]
  end

  # def test_where_with_exact_match
  #   assert_equal [@wolf], @fixtures.where(:name => 'The Wolf')
  # end

  def test_where_with_partial_match
    assert_equal [@charles, @glen], @fixtures.where(:title => /^B.*/)
  end

  # def test_where_with_mutliple_exact_results
  #   assert_equal [@boris, @wolf], @fixtures.where(:rank => 4)
  # end

  # def test_with_with_multiple_criteria
  #   assert_equal [@wolf], @fixtures.where(:rank => 4, :quote => /get/)
  # end

  # def test_with_chain_calls
  #   assert_equal [@charles], @fixtures.where(:quote => /if/i).where(:rank => 3)
  # end
end

class Array
  def where(options)
    if options
      elements = []
      puts self
      puts options

      self.each do |fixture|

        if fixture[:quote].index(options[:quote]) && options.key?(:quote)
          puts "fixture"
          puts fixture
          puts "options"
          puts options
          puts fixture
          elements.push(fixture)
        end

        if fixture[:title].index(options[:title]) && options.key?(:title)
          puts "fixture"
          puts fixture
          puts "options"
          puts options
          puts fixture
          elements.push(fixture)
        end

        options.each do |key|
          fixture.each do |seckey|
            if seckey == key
              puts "key"
              puts key
              puts "seckey"
              puts seckey
              puts "fixture"
              puts fixture
              elements.push(fixture)
            end
          end
        end

        elements.each do |threekey|

          if threekey[:name] != options[:name] && options.key?(:name)
            puts "not equal name"
            puts threekey[:name]
            puts options[:name]
            puts fixture
            elements.delete(fixture)
          end

          if threekey[:rank] != options[:rank] && options.key?(:rank)
            puts "not equal rank"
            puts threekey[:rank]
            puts options[:rank]
            puts fixture
            elements.delete(fixture)
          end

          if (threekey[:quote].index(options[:quote]) == nil) && options.key?(:quote)
            puts "not equal quote"
            puts threekey[:quote]
            puts options[:quote]
            puts fixture
            elements.delete(fixture)
          end

          if (threekey[:title].index(options[:title]) == nil) && options.key?(:title)
            puts "not equal title"
            puts threekey[:title]
            puts options[:title]
            puts fixture
            elements.delete(fixture)
          end
        end

      end

      elements = elements.uniq{|t| t[:name] }

      elements  

    end
  end
end