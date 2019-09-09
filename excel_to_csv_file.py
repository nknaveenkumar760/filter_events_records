import pandas as pd
import pymysql


conn = pymysql.connect("localhost", "root", "password123", "filter_data" )
#
# df = pd.read_excel('Testing File.xlsx', sheet_name='Sheet1')  # sheetname is optional
# df.to_csv('event_details.csv', index=False)  # index=False prevents pandas to write row index
# print("successfully converted...")

df2 = pd.read_csv('event_details.csv')
print(df2)


for row in df2:

    conn.cursor.execute('INSERT INTO searchapp_search_records(call_date, Time, user, full_name, lead_id, campaign_id, vender_lead_code,  )' \
          'VALUES("%s", "%s", "%s")',
          row)

conn.close()

print ("Done")