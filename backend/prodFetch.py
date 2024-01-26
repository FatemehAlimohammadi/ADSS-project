from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import asyncpg
import os

app = FastAPI()

# Database connection details
DATABASE_URL = os.getenv("DATABASE_URL")

# Receipt model
class Receipt(BaseModel):
    order_id: int

@app.post("/receipt")
async def create_receipt(receipt: Receipt):
    # Connect to the database
    conn = await asyncpg.connect(DATABASE_URL)

    # Retrieve the order
    order = await conn.fetchrow('SELECT * FROM orders WHERE id = $1', receipt.order_id)
    if not order:
        raise HTTPException(status_code=400, detail="Order not found")

    # Retrieve the order details
    order_details = await conn.fetch('SELECT * FROM order_details WHERE order_id = $1', receipt.order_id)

    # Close the connection
    await conn.close()

    # Create the receipt
    receipt = {
        "order_id": order["id"],
        "user_id": order["user_id"],
        "order_date": order["order_date"],
        "order_details": order_details
    }

    return receipt
