from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import engine
from app.api.v1 import user as useRoute
from app.api.v1 import category as categoryRoute
from app.api.v1 import product as productRoute
from app.api.v1 import auth as authRoute
from app.api.v1 import docsAuth as docsAuthRoute
from app.api.v1 import cart as cartRoute
from app.api.v1 import order as orderRoute
from app.models import user
from app.models import category
from app.models import product
app = FastAPI()

# CORS middleware to allow all origins during development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
from app.core.database import SessionLocal, engine

user.Base.metadata.create_all(bind=engine)
category.Base.metadata.create_all(bind=engine)
product.Base.metadata.create_all(bind=engine)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Include API routes
app.include_router(authRoute.router, prefix="/api/v1", tags=["api-Auth"])
app.include_router(docsAuthRoute.router, prefix="", tags=["auth"])
app.include_router(useRoute.router, prefix="/api/v1", tags=["user"])
app.include_router(categoryRoute.router, prefix="/api/v1", tags=["category"])
app.include_router(productRoute.router, prefix="/api/v1", tags=["product"])
app.include_router(cartRoute.router, prefix="/api/v1", tags=["cart"])
app.include_router(orderRoute.router, prefix="/api/v1", tags=["order"])

if __name__ == "__main__":
    import uvicorn

    # Run the application using Uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)



















# from typing import Union

# from fastapi import FastAPI

# app = FastAPI()



# @app.get("/")
# def read_root():
#     return {"Hello": "World"}


# @app.get("/items/{item_id}")
# def read_item(item_id: int, q: Union[str, None] = None):
#     return {"item_id": item_id, "q": q}
