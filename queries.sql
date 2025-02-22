-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.
SELECT ProductName, CategoryName FROM product AS p
    JOIN Category AS c ON p.CategoryId = c.Id

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.
SELECT o.Id AS OrderId, CompanyName FROM [Order] AS o
    JOIN Shipper AS s ON o.ShipVia = s.Id
    WHERE OrderDate < '2012-08-09';

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.
SELECT ProductName, count(ProductId) AS quantity FROM [Order] AS o
    JOIN OrderDetail AS od ON o.Id = od.OrderId
    JOIN Product AS p ON od.ProductId = p.Id
    WHERE od.OrderId = 10251
    GROUP BY p.Id
    ORDER BY ProductName;

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.
SELECT o.Id AS OrderID, CompanyName AS Cust_CompanyName, LastName AS Emp_LastName FROM [Order] AS o
    JOIN Customer AS c ON o.CustomerId = c.Id
    JOIN Employee AS e ON o.EmployeeId = e.Id
