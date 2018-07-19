require 'minitest/autorun'

class WhereTest < Minitest::Test

  def setup
    @boris   = {:name => 'Boris The Blade', :quote => "Heavy is good. Heavy is reliable. If it doesn't work you can always hit them.", :title => 'Snatch', :rank => 4}
    @charles = {:name => 'Charles De Mar', :quote => 'Go that way, really fast. If something gets in your way, turn.', :title => 'Better Off Dead', :rank => 3}
    @wolf    = {:name => 'The Wolf', :quote => 'I think fast, I talk fast and I need you guys to act fast if you wanna get out of this', :title => 'Pulp Fiction', :rank => 4}
    @glen    = {:name => 'Glengarry Glen Ross', :quote => "Put. That coffee. Down. Coffee is for closers only.",  :title => "Blake", :rank => 5}

    @fixtures = [@boris, @charles, @wolf, @glen]
  end

  def test_where_with_exact_match
    assert_equal [@wolf], @fixtures.where(:name => 'The Wolf')
  end

  def test_where_with_partial_match
    assert_equal [@charles, @glen], @fixtures.where(:title => /^B.*/)
  end

  def test_where_with_mutliple_exact_results
    assert_equal [@boris, @wolf], @fixtures.where(:rank => 4)
  end

  def test_with_with_multiple_criteria
    assert_equal [@wolf], @fixtures.where(:rank => 4, :quote => /get/)
  end

  def test_with_chain_calls
    assert_equal [@charles], @fixtures.where(:quote => /if/i).where(:rank => 3)
  end
end

class Array

  def where(options)

    if options

      # initializes an array for answers
      elements = []

      # iterates through each of the @fixtures
      self.each do |fixture|

        #if the passed options has a quote key and the specific fixure has what that option specifies
        # add to answers
        if options.key?(:quote) && fixture[:quote].index(options[:quote])
          elements.push(fixture)
        end

        # same as above but with title
        if options.key?(:title) && fixture[:title].index(options[:title])
          elements.push(fixture)
        end

        # iterates through all keys of the given options
        options.each do |key|

          # iterates through all keys of the given fixture
          fixture.each do |seckey|

            # if the keys match, add the elements to the answer
            if seckey == key
              elements.push(fixture)
            end
          end
        end

        # iterates through the answer hash to determine if ALL options keys are met
        # and drops the fixtures that do not meet all option keys
        elements.each do |threekey|

          if threekey[:name] != options[:name] && options.key?(:name)
            elements.delete(fixture)
          end

          if threekey[:rank] != options[:rank] && options.key?(:rank)
            elements.delete(fixture)
          end

          if options.key?(:quote) && (threekey[:quote].index(options[:quote]) == nil) 
            elements.delete(fixture)
          end

          if options.key?(:title) && (threekey[:title].index(options[:title]) == nil)
            elements.delete(fixture)
          end
        end

      end

      # deletes duplicate answers from the answers array
      elements = elements.uniq{|t| t[:name] }

      # returns the answers
      elements  

    end
  end
end