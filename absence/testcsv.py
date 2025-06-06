import csv

# # Open the CSV file in read mode
# with open('C:/Users/Asus/Documents/PFE/absence/f_results.csv', 'r') as csvfile:
#   # Create a reader object
#   csv_reader = csv.reader(csvfile)
  
#   # Iterate through the rows in the CSV file
#   for row in csv_reader:
#     # Access each element in the row
#     print(row)


def recherche_data_par_email(fichier_csv,email):

    with open(fichier_csv,mode='r',newline='') as csvfile:
        reader=csv.DictReader(csvfile)
        for row in reader:
            if row["Email"]==email:
                return row
        
        return None
    
x=recherche_data_par_email("C:/Users/Asus/Documents/PFE/absence/f_results.csv","xih4rjij@esprit.com")
print(x)