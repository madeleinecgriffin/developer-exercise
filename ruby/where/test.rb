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

  # def test_where_with_partial_match
  #   assert_equal [@charles, @glen], @fixtures.where(:title => /^B.*/)
  # end

  # def test_where_with_mutliple_exact_results
  #   assert_equal [@boris, @wolf], @fixtures.where(:rank => 4)
  # end

  def test_with_with_multiple_criteria
    assert_equal [@wolf], @fixtures.where(:rank => 4, :quote => /get/)
  end

  # def test_with_chain_calls
  #   assert_equal [@charles], @fixtures.where(:quote => /if/i).where(:rank => 3)
  # end
end

class Array
  def where(options)
    if options
      elements = []
      puts self

      self.each do |fixture|

        options.each do |key|
          fixture.each do |seckey|
            if seckey == key
              elements.push(fixture)
            end
          end
        end

        elements.each do |threekey|
          puts "options"
          puts options
          puts "elements"
          puts elements
          if threekey[:name] != options[:name] && options.key?(:name)
            puts "not equal name"
            puts threekey[:name]
            puts options[:name]
          end

          if threekey[:rank] != options[:rank] && options.key?(:rank)
            puts "not equal rank"
            puts threekey[:rank]
            puts options[:rank]
          end

          if threekey[:quote] != options[:quote] && options.key?(:quote)
            puts "not equal quote"
            puts threekey[:quote]
            puts options[:quote]
          end

          # options.each do |fourkey|
          #   puts "four"
          #   puts fourkey
          # end
          # puts "threekey"
          # puts threekey
        end

        # options.each do |threekey|
        #   if threekey != elements[:name] || threekey != elements[:quote] || threekey != elements[:title] || threekey != elements[:rank]
        #     puts "elements"
        #     puts elements
        #   end
        # end

        # if fixture[:name] == options[:name]
        #   elements.push(fixture)
        # end

        # if fixture[:quote] == options[:quote]
        #   elements.push(fixture)
        # end

        # if fixture[:title] == options[:title]
        #   elements.push(fixture)
        # end

        # if fixture[:rank] == options[:rank]
        #   elements.push(fixture)
        # end

      end
      
      puts elements
      elements  

    end
  end
end