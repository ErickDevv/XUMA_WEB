'use client';

import { useEffect, useState } from 'react';
import { ShoppingBag, Phone, MapPin, Clock, Droplet, Truck, MessageCircle, X, Menu } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    {
      title: 'Productos a Granel',
      description: 'Cloro, jabones, detergentes y más en la cantidad que necesites',
      icon: '🧴'
    },
    {
      title: 'Artículos de Limpieza',
      description: 'Escobas, trapeadores, cubetas y más para tu hogar',
      icon: '🧹'
    },
    {
      title: 'Productos de Higiene',
      description: 'Desinfectantes, jabones y artículos para el cuidado personal',
      icon: '🧼'
    },
    {
      title: 'Accesorios del Hogar',
      description: 'Todo lo necesario para mantener tu casa impecable',
      icon: '🏠'
    }
  ];

  const [menuOpen, setMenuOpen] = useState(false);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-sky-50">
      {/* Header/Navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img src="/xuma.png" alt="Logo" className="h-14 w-14 rounded-full object-cover" />
              <span className="text-2xl font-bold text-pink-500">Jarcería Xuma</span>
            </div>

            {/* Menú Desktop */}
            <div className="hidden md:flex space-x-8">
              <a href="#productos" className="nav-link">Productos</a>
              <a href="#entregas" className="nav-link">Entregas</a>
              <a href="#whatsapp" className="nav-link">WhatsApp</a>
              <a href="#nosotros" className="nav-link">Nosotros</a>
              <a href="#contacto" className="nav-link">Ubicación</a>
            </div>

            {/* Botón Móvil */}
            <button
              className="md:hidden text-pink-500 focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Menú Móvil */}
          {menuOpen && (
            <div className="flex flex-col md:hidden bg-white border-t border-gray-100 py-4 space-y-3">
              <a href="#productos" className="mobile-link" onClick={() => setMenuOpen(false)}>Productos</a>
              <a href="#entregas" className="mobile-link" onClick={() => setMenuOpen(false)}>Entregas</a>
              <a href="#whatsapp" className="mobile-link" onClick={() => setMenuOpen(false)}>WhatsApp</a>
              <a href="#nosotros" className="mobile-link" onClick={() => setMenuOpen(false)}>Nosotros</a>
              <a href="#contacto" className="mobile-link" onClick={() => setMenuOpen(false)}>Ubicación</a>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Todo para la
                <span className="text-pink-500"> limpieza</span> de tu
                <span className="text-sky-400"> hogar</span>
              </h1>
              <p className="text-xl text-gray-600">
                Productos de limpieza a granel y artículos para el hogar. La mejor calidad al mejor precio.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                <a
                  href="#productos"
                  className="inline-flex items-center justify-center bg-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-600 transition-all transform hover:scale-105 shadow-lg"
                >
                  Ver Productos
                </a>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  className="inline-flex items-center justify-center bg-green-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-600 transition-all transform hover:scale-105 shadow-lg"
                >
                  <svg
                    className="w-6 h-6 mr-2"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28" /></svg>
                  WhatsApp
                </a>
                <a
                  href="#contacto"
                  className="inline-flex items-center justify-center bg-white text-pink-500 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition-all border-2 border-pink-500 hover:scale-105 shadow-lg"
                >
                  Ubicación
                </a>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="/xuma.png"
                alt="Mascota Ajolote"
                className="w-3/4 sm:w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 text-6xl opacity-20">🧹</div>
        <div className="absolute bottom-20 right-10 text-6xl opacity-20">🪣</div>
      </section>

      {/* Categories Section */}
      <section id="categorias" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nuestras Categorías
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Encuentra todo lo que necesitas para tu hogar
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-pink-50 to-sky-50 p-6 rounded-2xl hover:shadow-xl transition-all transform hover:-translate-y-2 duration-300"
              >
                <div className="text-5xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{category.title}</h3>
                <p className="text-gray-600">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="productos" className="py-20 bg-gradient-to-br from-amber-50 via-pink-50 to-sky-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Productos Destacados
            </h2>
            <p className="text-xl text-gray-600">
              Calidad y precio en cada producto
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 duration-300"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-pink-500">{product.price}</span>
                      <ShoppingBag className="text-sky-400" size={24} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Delivery Section */}
      <section id="entregas" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Formas de Entrega
            </h2>
            <p className="text-xl text-gray-600">
              Elige la opción que mejor se adapte a ti
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8 items-stretch">
            {/* Pickup */}
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all">
              <div className="h-48 sm:h-56 md:h-64 bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center">
                <ShoppingBag className="text-white" size={60} />
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Retiro en Tienda</h3>
                <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
                  Compra directamente en nuestra sucursal desde la comodidad de tu hogar y recoge tu pedido cuando quieras.
                </p>
                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  <div className="flex items-start space-x-3">
                    <MessageCircle className="text-pink-600 flex-shrink-0 mt-1" size={18} />
                    <div>
                      <p className="text-sm sm:text-base font-bold text-gray-900">Ahorra tiempo</p>
                      <p className="text-xs sm:text-sm text-gray-600">Haz tu pedido por WhatsApp y retíralo, sin filas ni esperas</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MessageCircle className="text-pink-600 flex-shrink-0 mt-1" size={18} />
                    <div>
                      <p className="text-sm sm:text-base font-bold text-gray-900">Ordena por WhatsApp</p>
                      <p className="text-xs sm:text-sm text-gray-600">Envía tu pedido y confirma tu retiro</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-3 sm:p-4 border-2 border-pink-500">
                  <p className="text-xs sm:text-sm font-bold text-pink-600 mb-2">📱 CONTACTO VÍA WHATSAPP:</p>
                  <a
                    href="https://wa.me/5256065076"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-pink-500 text-white px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-semibold hover:bg-pink-600 transition-all w-full justify-center"
                  >
                    <MessageCircle size={18} />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Home Delivery */}
            <div className="bg-gradient-to-br from-sky-50 to-sky-100 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all">
              <div className="h-48 sm:h-56 md:h-64 bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center">
                <Truck className="text-white" size={60} />
              </div>
              <div className="p-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Envío a Domicilio</h3>
                <p className="text-gray-700 mb-6">
                  Recibe tu pedido directamente en tu casa o negocio de manera rápida y segura.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start space-x-3">
                    <Truck className="text-sky-600 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-bold text-gray-900">¡PRÓXIMAMENTE!</p>
                      <p className="text-sm text-gray-600">Disponible muy pronto</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Truck className="text-sky-600 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="font-bold text-gray-900">Zona de cobertura</p>
                      <p className="text-sm text-gray-600">San Cayetano, Pachuca de Soto, Hidalgo</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 border-2 border-sky-400">
                  <p className="text-sm font-bold text-sky-600 mb-2">📦 SOLICITA TU ENVÍO:</p>
                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-sky-400 text-white px-6 py-2 rounded-full font-semibold hover:bg-sky-500 transition-all w-full justify-center"
                  >
                    <MessageCircle size={20} />
                    <span>PRÓXIMAMENTE</span>
                  </a>
                </div>
              </div>
            </div>
          </div>


        </div>
      </section>

      <section id="whatsapp" className="scroll-mt-20">
        <div className="text-center py-12 px-4 sm:px-6 lg:px-8 bg-green-50 rounded-lg mx-4 mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mx-4 mb-4">
            WhatsApp
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            <span className="font-bold">¡Fácil y rápido!</span> Contáctanos por WhatsApp para cualquier información
          </p>
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center space-x-2 sm:space-x-3 bg-green-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-green-600 transition-all transform hover:scale-105 shadow-lg mx-auto"
          >
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28" /></svg>
            <span className="text-sm sm:text-base md:text-lg">Contáctanos por WhatsApp</span>
          </a></div>
      </section>

      {/* About Section */}
      <section id="nosotros" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">
                ¿Por qué elegirnos?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Droplet className="text-pink-500 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Productos a Granel</h3>
                    <p className="text-gray-600">Compra solo la cantidad que necesitas y ahorra más</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Droplet className="text-sky-400 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Calidad Garantizada</h3>
                    <p className="text-gray-600">Los mejores productos para la limpieza de tu hogar</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Droplet className="text-pink-500 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Precios Accesibles</h3>
                    <p className="text-gray-600">Los mejores precios del mercado sin comprometer calidad</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Droplet className="text-sky-400 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Gran Variedad</h3>
                    <p className="text-gray-600">Amplio surtido de productos y artículos para el hogar</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-pink-50 to-sky-50 p-8 rounded-3xl shadow-2xl">
                <div className="text-center space-y-4">
                  <div className="text-6xl">🧴</div>
                  <h3 className="text-2xl font-bold text-gray-900">Enfocados en tú satisfacción</h3>
                  <p className="text-gray-600">Sirviendo a la comunidad con los mejores productos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 bg-gradient-to-br from-pink-50 to-sky-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Visítanos
            </h2>
            <p className="text-xl text-gray-600">
              Estamos listos para atenderte
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex items-start space-x-4">
                  <div className="bg-pink-500 p-3 rounded-full">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Dirección</h3>
                    <p className="text-gray-600">C. Cofre de Perote 1709, San Cayetano el Bordo</p>
                    <p className="text-gray-600">42084 Pachuca de Soto, Hgo.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex items-start space-x-4">
                  <div className="bg-sky-400 p-3 rounded-full">
                    <Phone className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Teléfono</h3>
                    <p className="text-gray-600">+52 (55) 6065-0766</p>
                    <p className="text-gray-600">WhatsApp disponible</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex items-start space-x-4">
                  <div className="bg-pink-500 p-3 rounded-full">
                    <Clock className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Horario</h3>
                    <p className="text-gray-600">Martes a Sábado: 10:30 - 19:00</p>
                    <p className="text-gray-600">Domingos: 10:30 - 16:00</p>
                    <p className="text-gray-600">Lunes: Cerrado</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3746.839996407124!2d-98.7749785247466!3d20.098974319063014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1a1e674c6d635%3A0xf9574abf7e7a7b6d!2sXUMA%3A%20ESPECIALISTAS%20EN%20LIMPIEZA!5e0!3m2!1ses-419!2smx!4v1762108804921!5m2!1ses-419!2smx"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Jarcería Xuma"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-3 sm:mb-4">
                <img
                  src="/xuma.png"
                  alt="Logo"
                  className="h-10 w-10 sm:h-12 sm:w-12 rounded-full"
                />
                <span className="text-lg sm:text-xl font-bold">Jarcería Xuma</span>
              </div>
              <p className="text-sm sm:text-base text-gray-400">
                Tu tienda de confianza para productos de limpieza y artículos del hogar.
              </p>
            </div>

            <div>
              <h4 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-1.5 sm:space-y-2">
                <li><a href="#productos" className="text-sm sm:text-base text-gray-400 hover:text-pink-400 transition-colors">Productos</a></li>
                <li><a href="#entregas" className="text-sm sm:text-base text-gray-400 hover:text-pink-400 transition-colors">Entregas</a></li>
                <li><a href="#whatsapp" className="text-sm sm:text-base text-gray-400 hover:text-pink-400 transition-colors">WhatsApp</a></li>
                <li><a href="#nosotros" className="text-sm sm:text-base text-gray-400 hover:text-pink-400 transition-colors">Nosotros</a></li>
                <li><a href="#contacto" className="text-sm sm:text-base text-gray-400 hover:text-pink-400 transition-colors">Ubicación</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Ubicación</h4>
              <div className="flex items-start space-x-2 text-gray-400">
                <MapPin className="flex-shrink-0 mt-1" size={18} />
                <p className="text-sm sm:text-base">C. Cofre de Perote 1709, San Cayetano el Bordo, 42084 Pachuca de Soto, Hgo.</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 sm:pt-8 text-center text-gray-400">
            <p className="text-xs sm:text-sm">&copy; 2025 Jarcería Xuma. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
