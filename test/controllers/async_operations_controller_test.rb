require "test_helper"

class AsyncOperationsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get async_operations_index_url
    assert_response :success
  end

  test "should get status" do
    get async_operations_status_url
    assert_response :success
  end
end
