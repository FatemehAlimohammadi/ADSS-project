from datetime import datetime, timedelta
from enum import Enum

def calculate_future_date(days: int):
    current_date = datetime.now()
    future_date = current_date + timedelta(days=days)
    return {"current_date": current_date, "future_date": future_date}

def get_day_of_week():
        current_date = datetime.now()
        day_of_week = current_date.strftime("%A")
        return day_of_week

def get_index_day_in_week():
   try:
        class Weekday(Enum):
            SATURDAY = 0
            SUNDAY = 1
            MONDAY = 2
            TUESDAY = 3
            WEDNESDAY = 4
            THURSDAY = 5
            FRIDAY = 6
        
        
      
        day_of_week = get_day_of_week()
        return Weekday[day_of_week.upper()].value
   except KeyError:
       return 0

   
