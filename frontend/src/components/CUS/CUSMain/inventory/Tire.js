import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

function Lubricants() {
  const [Products, setProducts] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [quantities, setQuantities] = useState({});
  const [cart, setcart] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    function getProducts() {
      axios
        .get("http://localhost:5000/Product/Tirestock")
        .then((res) => {
          const initialQuantities = {};
          res.data.forEach((product) => {
            initialQuantities[product._id] = 0;
            product.initialQuantity = product.Quantity;
          });
          setProducts(res.data);
          setQuantities(initialQuantities);
        })
        .catch((err) => {
          alert("error");
        });
    }
    getProducts();
  }, []);

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
  };

  const increment = (productId, initialQuantity) => {
    if (
      quantities[productId] < initialQuantity ||
      initialQuantity > 0 || 
      (quantities[productId] === 0 && initialQuantity > 0) 
    ) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: prevQuantities[productId] + 1,
      }));
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId
            ? { ...product, Quantity: product.Quantity - 1 }
            : product
        )
      );
    }
  };

  const decrement = (productId, initialQuantity) => {
    if (quantities[productId] > 0) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: prevQuantities[productId] - 1,
      }));
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId
            ? { ...product, Quantity: product.Quantity + 1 }
            : product
        )
      );
    }
  };

  const addToCart = (
    productId,
    productName,
    unitPrice,
    quantity,
    image,
    pquantity,
    brand
  ) => {
    const newquantity = pquantity - quantity;

    const updateLub = {
      Product_name: productName,
      Product_brand: brand,
      Quantity: newquantity,
      Unit_price: unitPrice,
      image: image,
    };

    axios
      .put(
        `http://localhost:5000/Product/updateTire/${productId}`,
        updateLub
      )
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get("http://localhost:5000/Product/getcart")
      .then((res) => {
        const cartData = res.data;
        console.log(cartData);
        const productToUpdate = cartData.find(
          (item) => item.Product_name === productName
        );
        const pastItemId = productToUpdate ? productToUpdate._id : null;
        console.log("productto update", pastItemId);
        if (productToUpdate) {
          const updatedQuantity = productToUpdate.Quantity + quantity;
          console.log(productToUpdate.Product_name);
          axios
            .put(`http://localhost:5000/Product/updatecart/${pastItemId}`, {
              Quantity: updatedQuantity,
            })
            .then((response) => {
              console.log(response.data);
              window.location.reload();
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          const cartItem = {
            product_name: productName,
            unit_price: unitPrice,
            quantity: quantity,
            image: image,
          };
          axios
            .post("http://localhost:5000/Product/addcart", cartItem)
            .then((response) => {
              console.log(response.data);
              window.location.reload();
              setcart([...cart, response.data]);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      })
      .catch((err) => {
        alert("Error occurred while fetching cart data");
      });
  };

  const emptycart = () => {
    axios
      .get("http://localhost:5000/Product/getcart")
      .then((cartRes) => {
        const cartItems = cartRes.data;
        axios
          .get("http://localhost:5000/Product/lubricantstock")
          .then((stockRes) => {
            const stockItems = stockRes.data;

            cartItems.forEach((cartItem) => {
              const matchingStockItem = stockItems.find(
                (stockItem) => stockItem.Product_name === cartItem.Product_name
              );

              if (matchingStockItem) {
                const newQuantity =
                  cartItem.Quantity + matchingStockItem.Quantity;

                const updateLub = {
                  Product_name: matchingStockItem.Product_name,
                  Product_brand: matchingStockItem.Product_brand,
                  Quantity: newQuantity,
                  Unit_price: matchingStockItem.Unit_price,
                  image: matchingStockItem.image,
                };

                axios
                  .put(
                    `http://localhost:5000/Product/updatelubricant/${matchingStockItem._id}`,
                    updateLub
                  )
                  .then((response) => {
                    console.log(response);
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              } else {
                console.log(
                  "No matching stock item found for cart item:",
                  cartItem
                );
              }
            });

            // After updating lubricant stock, delete cart
            axios
              .delete("http://localhost:5000/Product/emptycart")
              .then(() => {
                console.log("Cart emptied successfully.");
                // Reload the page after emptying the cart
                window.location.reload();
              })
              .catch((error) => {
                console.error("Error emptying cart:", error);
              });
          })
          .catch((stockErr) => {
            console.error("Error fetching stock data:", stockErr);
          });
      })
      .catch((cartErr) => {
        console.error("Error fetching cart data:", cartErr);
      });
  };

  useEffect(() => {
    function getcart() {
      axios
        .get("http://localhost:5000/Product/getcart")
        .then((res) => {
          setcart(res.data);
        })
        .catch((err) => {
          alert("error");
        });
    }
    getcart();
  }, []);
  const Delete = (id, pname, quantity) => {
    axios
      .get("http://localhost:5000/Product/lubricantstock")
      .then((stockRes) => {
        const stockItems = stockRes.data;
  
        const matchingStockItem = stockItems.find(
          (stockItem) => stockItem.Product_name === pname
        );
  
        if (matchingStockItem) {
          const newQuantity =
            quantity + matchingStockItem.Quantity;
  
          const updateLub = {
            Product_name: matchingStockItem.Product_name,
            Product_brand: matchingStockItem.Product_brand,
            Quantity: newQuantity,
            Unit_price: matchingStockItem.Unit_price,
            image: matchingStockItem.image,
          };
  
          axios
            .put(
              `http://localhost:5000/Product/updatelubricant/${matchingStockItem._id}`,
              updateLub
            )
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          console.log(
            "No matching stock item found for cart item:",
            pname
          );
        }
      })
      .then(() => {
        axios
          .delete(`http://localhost:5000/Product/deletecart/${id}`)
          .then((response) => {
            console.log(response);
            window.location.reload();
          })
          .catch((error) => {
            console.error(error);
          });
      });
  };
  

  const checkout = () => {
    const allProducts = [];
    let total = 0;
    axios
      .get("http://localhost:5000/Product/getcart")
      .then((res) => {
        const cart = res.data;
        total = cart.reduce(
          (acc, item) => acc + item.Unit_price * item.Quantity,
          0
        );

        cart.forEach((item) => {
          allProducts.push({
            product_name: item.Product_name,
            unit_price: item.Unit_price,
            quantity: item.Quantity,
          });
        });

        console.log(allProducts);

        const order = {
          date: new Date(),
          products: allProducts,
          total: total,
          status: "pending",
        };

        console.log(order);
        axios
          .post("http://localhost:5000/Product/addorder", order)
          .then((response) => {
            const orderId = response.data.orderId;
            console.log(orderId);

            const emailData = {
              to: "iamtharindunawarathne@gmail.com",
              subject: `Your Cart Details orderID :${orderId}`,
              text: `Here are your cart details: `,
              html: null,
              orderId: orderId
            };

            axios
              .post(
                "http://localhost:5000/Product/sendinventoryemail",
                emailData
              )
              .then((response) => {
                console.log(response.data);

                axios.delete("http://localhost:5000/Product/clear-cart")
              .then((response) => {
                console.log("Cart cleared successfully");
              })
              .catch((error) => {
                console.error("Error clearing cart:", error);
              });
            })
              .catch((error) => {
                console.error("Error sending email:", error);
              });
          })
          .catch((error) => {
            console.error("Error adding order:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching cart:", error);
        alert("error");
      });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const filteredProducts =
    selectedBrand === ""
      ? Products
      : Products.filter((product) => product.Product_brand === selectedBrand);

  return (
    <div style={{ marginTop: "2%", marginLeft: "3%" }}>
      <h1 style={{ textAlign: "center" }}>GET FIRST CLASS LUBRICANTS </h1>
      <div style={{ display: "flex", marginTop: "4%" }}>
        <Form.Label
          style={{ marginLeft: "15%", fontWeight: "bold", fontSize: "20px" }}
        >
          Brand
        </Form.Label>
        <Form.Select
          aria-label="Default select example"
          style={{ marginLeft: "2%", width: "20%" }}
          onChange={handleBrandChange}
          value={selectedBrand}
        >
          <option value="">All</option>
          <option value="val">val</option>
          <option value="maxxies">maxxies</option>
          <option value="Servo">Servo</option>
        </Form.Select>
        <Button
          variant="outline-dark"
          style={{ marginLeft: "45%" }}
          size="lg"
          onClick={handleShow}
        >
          Cart <i class="bi bi-cart"></i>
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: "7%",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginRight: "3%",
        }}
      >
        {filteredProducts.map((product) => (
          <Card style={{ width: "30%" }}>
            <Card.Img
              variant="top"
              src={`http://localhost:5000/${product.image}`}
            />
            <Card.Body>
              <Card.Title style={{ textAlign: "center" }}>
                {product.Product_name}
              </Card.Title>
              <Card.Text style={{ textAlign: "center" }}>
                {product.Product_brand}
              </Card.Text>
              <hr />
              <Card.Text style={{ textAlign: "center" }}>
                Unit price : Rs.{product.Unit_price}
              </Card.Text>
              <hr />
              <Row>
                <Col md={7}>
                  <Card.Text>Available Quantity : {product.Quantity}</Card.Text>
                  <div style={{ display: "flex" }}>
                    <Button
                      variant="light"
                      onClick={() => decrement(product._id, product.Quantity)}
                    >
                      <i class="bi bi-dash-circle-fill" />
                    </Button>
                    <Form.Control
                      className="remove-spinner"
                      type="number"
                      style={{ width: "30%" }}
                      value={quantities[product._id]}
                    />
                    <Button
                      variant="light"
                      onClick={() => increment(product._id, product.Quantity)}
                    >
                      <i class="bi bi-plus-circle-fill" />
                    </Button>
                  </div>
                </Col>
                <Col md={4}>
                  <Button
                    variant="secondary"
                    style={{ marginTop: "15%" }}
                    onClick={() =>
                      addToCart(
                        product._id,
                        product.Product_name,
                        product.Unit_price,
                        quantities[product._id],
                        product.image,
                        product.initialQuantity,
                        product.Product_brand
                      )
                    }
                    disabled={quantities[product._id] === 0}
                  >
                    Add to cart <i className="bi bi-cart-plus-fill"></i>
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
      </div>
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Your Cart</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table>
              <thead>
                <tr>
                  <th></th>
                  <th>prodcut</th>
                  <th>price</th>
                  <th>quantity</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((cartItem) => (
                  <tr key={cartItem._id}>
                    <td
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={`http://localhost:5000/${cartItem.image}`}
                        alt={cartItem.Product_name}
                        style={{ width: "40%", height: "40%" }}
                      />
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {cartItem.Product_name}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {cartItem.Unit_price}
                    </td>
                    <td style={{ textAlign: "center" }}>{cartItem.Quantity}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => Delete(cartItem._id,cartItem.Product_name,cartItem.Quantity)}
                      >
                        remove
                      </Button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={4}>
                    <b>Total</b>
                  </td>
                  <td>
                    Rs.
                    {cart.reduce(
                      (total, item) => total + item.Unit_price * item.Quantity,
                      0
                    )}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={emptycart}>
              Empty cart
            </Button>
            <Button variant="success" onClick={checkout}>
              Check out
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Lubricants;