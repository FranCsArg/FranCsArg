class Producto 
{
    constructor(nombre,precio,cod,img,cantidad)
    {
        this.nombre = nombre;
        this.precio = precio;
        this.cod = cod;
        this.img = img;
        this.cantidad = cantidad;
    }

    sumarCantidad()
    {
        this.cantidad +=1;
    }

    subTotal()
    {
        return (this.precio * this.cantidad);
    }
}