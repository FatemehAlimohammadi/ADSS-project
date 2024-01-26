from fastapi.testclient import TestClient
from main import app, shopping_cart, Product

client = TestClient(app)

def test_add_to_cart():
    product_id = 1
    product_data = {"name": "Test Product", "quantity": 2}
    
    response = client.post(f"/add-to-cart/{product_id}", json=product_data)

    assert response.status_code == 200
    assert response.json() == {"name": "Test Product", "quantity": 2}
    assert shopping_cart[product_id] == Product(**product_data)

def test_view_cart():
    user_id = 1

    response = client.get(f"/view-cart/{user_id}")

    assert response.status_code == 200
    assert response.json() == {"name": "Test Product", "quantity": 2}


def test_update_cart():
    product_id = 1
    updated_product_data = {"name": "Updated Product", "quantity": 3}
    
    response = client.put(f"/update-cart/{product_id}", json=updated_product_data)
    
    assert response.status_code == 200
    assert response.json() == updated_product_data
    assert shopping_cart[product_id] == Product(**updated_product_data)

def test_remove_from_cart():
    product_id = 1
    
    response = client.delete(f"/remove-from-cart/{product_id}")
    
    assert response.status_code == 200
    assert response.json() == {"message": "Product removed from the cart", "removed_product": {"name": "Updated Product", "quantity": 3}}
    assert product_id not in shopping_cart
