import secrets
import string

def generate_random_string(length=10):
    # Define the characters to use for generating the string
    characters = string.ascii_letters + string.digits
    
    # Generate a random string of the specified length
    random_string = ''.join(secrets.choice(characters) for _ in range(length))
    
    return random_string

# Example usage

