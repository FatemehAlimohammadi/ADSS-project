# from datetime import datetime
# from enum import Enum

# class Weekday(Enum):
#     SATURDAY = 0
#     SUNDAY = 1
#     MONDAY = 2
#     TUESDAY = 3
#     WEDNESDAY = 4
#     THURSDAY = 5
#     FRIDAY = 6
    
    
# def get_day_of_week():
#     current_date = datetime.now()
#     day_of_week = current_date.strftime("%A")
#     return day_of_week

# day_of_week = get_day_of_week()

# print(Weekday[day_of_week.upper()].value)





from datetime import datetime, timedelta

def get_date_range():
    today = datetime.now()

    # List dates for the last 7 days
    last_seven_days = [today - timedelta(days=i) for i in range(7)][::-1]

    # List dates for the next 4 days
    next_four_days = [today + timedelta(days=i) for i in range(1, 5)]

    return last_seven_days, next_four_days

# Example usage:
last_seven_days, next_four_days = get_date_range()

print("Last 7 days:")
for date in last_seven_days:
    print(date.strftime("%Y-%m-%d"))

print("\nNext 4 days:")
for date in next_four_days:
    print(date.strftime("%Y-%m-%d"))

