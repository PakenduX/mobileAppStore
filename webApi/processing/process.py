import pandas as pd
import numpy as np

from plotly import tools
import missingno as msno
import random

# Supress unnecessary warnings so that presentation looks clean
import warnings
warnings.filterwarnings("ignore")

df_app = pd.read_csv('./app-store-apple-data-set-10k-apps/AppleStore.csv')
df_app.isnull().sum()


df_app.size_bytes.dtypes
df_app.rename(columns={"ipadSc_urls.num":"ipad_urls"} , inplace =True)

df_application = pd.DataFrame()
df_application['size_bytes'] = df_app.size_bytes
df_application['prime_genre'] = df_app.prime_genre
df_application['price'] = df_app.price
df_application['lang_num'] = df_app['lang.num']
df_application['sup_devices.num'] = df_app['sup_devices.num']
df_application['rating_count_tot'] = df_app['rating_count_tot']
df_application['rating'] = df_app.user_rating

from sklearn import preprocessing
le = preprocessing.LabelEncoder()
df_application.prime_genre = le.fit_transform(df_app.prime_genre)

from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestClassifier
X = df_application.iloc[:,:-1]
y = df_application.iloc[:, -1]
y = y.astype(int)

from sklearn.model_selection import train_test_split
X_train,X_test,y_train,y_test = train_test_split(X, y, test_size=0.33, random_state=42)

def randomForest(taille, categorie, prix, nbLang, nbDevices, nbAvisTotal):
    random_for = RandomForestClassifier(n_estimators=100, max_depth=2,random_state=0)
    random_for.fit(X_train,y_train)
    score =random_for.score(X_test,y_test)
    return random_for.predict([[taille, categorie, prix, nbLang, nbDevices, nbAvisTotal]])

def naiveBayes(taille, categorie, prix, nbLang, nbDevices, nbAvisTotal):

    from sklearn.naive_bayes import GaussianNB
    gnb = GaussianNB()
    gnb.fit(X_train, y_train)
    return gnb.predict([[taille, categorie, prix, nbLang, nbDevices, nbAvisTotal]])

def knn(taille, categorie, prix, nbLang, nbDevices, nbAvisTotal):
    from sklearn.neighbors import KNeighborsClassifier
    knn = KNeighborsClassifier(n_neighbors=25)
    knn.fit(X_train, y_train) 
    return knn.predict([[taille, categorie, prix, nbLang, nbDevices, nbAvisTotal]])
