import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Check, Gauge, Shield, Users, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      icon: Zap,
      title: "Ultra Rápido",
      description: "Rendimiento optimizado para la máxima velocidad",
    },
    {
      icon: Shield,
      title: "Seguro",
      description: "Autenticación y encriptación de grado empresarial",
    },
    {
      icon: Gauge,
      title: "Escalable",
      description: "Crece con tu negocio sin limitaciones",
    },
    {
      icon: Users,
      title: "Colaborativo",
      description: "Trabaja en equipo de forma eficiente",
    },
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$29",
      description: "Perfecto para comenzar",
      features: [
        "Hasta 5 usuarios",
        "5 GB de almacenamiento",
        "Soporte por email",
        "Análisis básico",
      ],
      cta: "Comenzar gratis",
      popular: false,
    },
    {
      name: "Pro",
      price: "$79",
      description: "Para equipos en crecimiento",
      features: [
        "Usuarios ilimitados",
        "500 GB de almacenamiento",
        "Soporte prioritario",
        "Análisis avanzado",
        "Integraciones API",
        "Dashboard personalizado",
      ],
      cta: "Comenzar gratis",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Contacta",
      description: "Solución personalizada",
      features: [
        "Almacenamiento ilimitado",
        "Soporte 24/7 dedicado",
        "SLA garantizado",
        "Seguridad avanzada",
        "Implementación personalizada",
        "Contrato dedicado",
      ],
      cta: "Contactar ventas",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-black">AppSaaS</div>
            <div className="flex gap-4">
              <Button
                variant="ghost"
                asChild
              >
                <Link href="/login">Ingresar</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Registrarse</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          <Badge
            variant="outline"
            className="inline-block"
          >
            🎉 Bienvenido a AppSaaS
          </Badge>

          <h1 className="text-5xl md:text-6xl font-bold text-black leading-tight">
            La solución SaaS que tu negocio
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-purple-600">
              necesitaba
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Gestiona tu negocio con la plataforma más moderna del mercado.
            Segura, rápida y escalable para empresas de cualquier tamaño.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="text-base"
            >
              <Link href="/register">
                Comenzar gratis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-base"
            >
              <Link href="/login">Ver demostración</Link>
            </Button>
          </div>

          <p className="text-sm text-gray-500">
            No se requiere tarjeta de crédito • 14 días de prueba gratis
          </p>
        </div>
      </section>

      <Separator />

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl font-bold text-black">Características</h2>
          <p className="text-xl text-gray-600">
            Todo lo que necesitas para triunfar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Card
                key={idx}
                className="p-6 border border-gray-100"
              >
                <div className="mb-4">
                  <Icon className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="font-semibold text-lg text-black mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </section>

      <Separator />

      {/* Pricing Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl font-bold text-black">Planes y Precios</h2>
          <p className="text-xl text-gray-600">
            Elige el plan perfecto para tu equipo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, idx) => (
            <Card
              key={idx}
              className={`overflow-hidden transition-shadow ${
                plan.popular
                  ? "border-2 border-blue-500 shadow-lg"
                  : "border border-gray-100"
              }`}
            >
              {plan.popular && (
                <div className="bg-blue-500 text-white text-center py-2 text-sm font-semibold">
                  MÁS POPULAR
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-black mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-black">
                    {plan.price}
                  </span>
                  {plan.price !== "Contacta" && (
                    <span className="text-gray-600 ml-2">/mes</span>
                  )}
                </div>

                <Button
                  className="w-full mb-6"
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>

                <Separator className="my-6" />

                <ul className="space-y-3">
                  {plan.features.map((feature, featureIdx) => (
                    <li
                      key={featureIdx}
                      className="flex items-start gap-3"
                    >
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Card className="bg-linear-to-r from-blue-500 to-purple-600 border-0 p-12">
          <div className="text-center space-y-6">
            <h2 className="text-4xl font-bold text-white">
              ¿Listo para comenzar?
            </h2>
            <p className="text-xl text-blue-100">
              Únete a cientos de empresas que ya confían en AppSaaS
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="text-blue-600"
              >
                <Link href="/register">
                  Crear cuenta gratuita
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="default"
              >
                <Link
                  href="/login"
                  className="text-white border-white"
                >
                  Ya tengo cuenta
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-black mb-4">Producto</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a
                    href="#"
                    className="hover:text-black transition"
                  >
                    Características
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-black transition"
                  >
                    Precios
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-black transition"
                  >
                    Seguridad
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-black mb-4">Empresa</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a
                    href="#"
                    className="hover:text-black transition"
                  >
                    Sobre nosotros
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-black transition"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-black transition"
                  >
                    Carreras
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-black mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a
                    href="#"
                    className="hover:text-black transition"
                  >
                    Privacidad
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-black transition"
                  >
                    Términos
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-black transition"
                  >
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-black mb-4">Social</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a
                    href="#"
                    className="hover:text-black transition"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-black transition"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-black transition"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <Separator />
          <div className="flex flex-col md:flex-row justify-between items-center mt-8 text-sm text-gray-600">
            <p>&copy; 2026 AppSaaS. Todos los derechos reservados.</p>
            <p>Hecho con ❤️ por el equipo de AppSaaS</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
