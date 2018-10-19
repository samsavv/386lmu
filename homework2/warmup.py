import math
from cryptography.fernet import Fernet
import random
import requests
import cryptography

# NUMBER ONE
def change(amount):
    if(amount < 0):
        raise ValueError('amount cannot be negative')
    quarters = math.floor(amount/25)
    amount = amount % 25
    dimes = math.floor(amount/10)
    amount = amount % 10
    nickles = math.floor(amount/5)
    amount = amount % 5
    return (quarters, dimes, nickles, amount)

# NUMBER TWO
def strip_quotes(s):
    s = s.replace("'","")
    s = s.replace('"',"")
    return s;


# NUMBER THREE
def scramble(s):
    array = s.split()
    n = len(s)
    for i in range(0,n):
        j = math.floor(random.uniform(0, 1) * i)
        temp = array[i]
        array[i] = array[j]
        array[j]= temp
    return ' '.join(array)

def powers(base, n):
	num = 1
	while num <= n:
		yield num
		num *= base

def say(str = ''):
    if str == '':
        return str

    def say_more(word = ''):
        if word == '':
            return str
        return say(str + " " + word)
    return say_more

def random_name(gender, region):
    kwargs = {'gender': gender, 'region': region, 'amount': '1'}
    response = requests.get("http://api.uinames.com", params=kwargs)
    name = response.json();

    if response.get('error') is None:
        return '{}, {}'.format(response.get('surname'), response.get('name'))
    raise ValueError(str(response))
def triples(n):
    result = []
    for i in range(1,n+1):
        for j in range(1,i):
            for k in range(1,j):
                if math.pow(i,2) + math.pow(j,2) == math.pow(k,2):
                    result.append((i, j, k))
    return result
# // NUMBER SEVEN
def interleave(a, *args):
    array = a;
    values = args;
    result = [];
    if(len(array) >= len(values)):
        for i in range(0, len(array)):
            if(i < len(values)):
                result.append(array[i])
                result.append(values[i])
            else:
                result.append(array[i]);
    else:
        for i in range(0, len(values)):
            if(i < len(array)):
                result.append(array[i])
                result.append(values[i])
            else:
                result.append(values[i])
    return result


# // NUMBER EIGHT
class Cylinder():
    def __init__(self, radius = 1, height = 1):
        self.radius = radius
        self.height = height
    @property
    def surface_area(self):
        return ((2 * math.pi * self.radius * self.height) + (2 * math.pi * (self.radius **2 )))
    @property
    def volume(self):
        return (math.pi * self.radius * self.radius * self.height)
    def widen(self,factor):
        self.radius *= factor
        return self
    def stretch(self,factor):
        self.height *= factor
        return self
    def __str__(self):
        return "Cylinder with radius of ${radius} and height of ${height}"

# NUMBER NINE
def make_crypto_functions(key):
    f = Fernet(key)
    def a(text):
        return f.encrypt(text)
    def b(text):
        return f.decrypt(text)
    return (a, b)
