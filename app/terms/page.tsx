import { Separator } from "@/components/ui/separator";

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-primary">Términos y Condiciones</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="lead">
            Bienvenido a TuApuesta. Al acceder a este sitio web, aceptas cumplir con estos términos de servicio, todas las leyes y regulaciones aplicables, y reconoces que eres responsable de cumplir con las leyes locales aplicables.
          </p>
          
          <Separator className="my-6" />
          
          <h2 className="text-xl font-semibold mt-8 mb-4">1. Introducción</h2>
          <p>
            Estos Términos y Condiciones rigen el uso del sitio web TuApuesta y todos los servicios relacionados. Al utilizar nuestro sitio web, aceptas estos términos en su totalidad. Si no estás de acuerdo con estos términos, no debes utilizar nuestro sitio web.
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">2. Uso del Sitio</h2>
          <p>
            TuApuesta proporciona información sobre apuestas deportivas, casinos online y regulaciones legales en diferentes países. Esta información es solo para fines educativos e informativos. No promovemos ni fomentamos las apuestas.
          </p>
          <p>
            El contenido de este sitio web es solo para tu información general y no constituye asesoramiento en el que debas confiar. Debes obtener asesoramiento profesional o especializado antes de tomar, o abstenerte de tomar, cualquier acción basada en el contenido de nuestro sitio.
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">3. Restricciones de Edad</h2>
          <p>
            El acceso a este sitio web está restringido a personas mayores de 18 años o la edad legal para apostar en tu jurisdicción, la que sea mayor. Al acceder a este sitio, confirmas que tienes la edad legal requerida.
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">4. Propiedad Intelectual</h2>
          <p>
            A menos que se indique lo contrario, TuApuesta y/o sus licenciantes poseen los derechos de propiedad intelectual de todo el material en TuApuesta. Todos los derechos de propiedad intelectual están reservados.
          </p>
          <p>
            Puedes ver y/o imprimir páginas de este sitio web para tu uso personal, sujeto a las restricciones establecidas en estos términos y condiciones.
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">5. Restricciones</h2>
          <p>
            No debes:
          </p>
          <ul>
            <li>Republicar material de este sitio web</li>
            <li>Vender, alquilar o sublicenciar material de este sitio web</li>
            <li>Reproducir, duplicar o copiar material de este sitio web</li>
            <li>Redistribuir contenido de TuApuesta</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">6. Enlaces a Terceros</h2>
          <p>
            Este sitio web puede contener enlaces a sitios web de terceros. Estos enlaces son proporcionados para tu conveniencia para proporcionar más información. No significan que respaldemos el(los) sitio(s) web. No tenemos responsabilidad por el contenido del(los) sitio(s) web enlazado(s).
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">7. Limitación de Responsabilidad</h2>
          <p>
            En ningún caso TuApuesta, ni sus directores, empleados, socios, agentes, proveedores o afiliados, serán responsables por cualquier daño indirecto, incidental, especial, consecuente o punitivo, incluyendo sin limitación, pérdida de beneficios, datos, uso, buena voluntad, u otras pérdidas intangibles, resultantes de:
          </p>
          <ul>
            <li>El uso o la imposibilidad de usar el servicio</li>
            <li>Cualquier conducta o contenido de terceros en el servicio</li>
            <li>Cualquier contenido obtenido del servicio</li>
            <li>Acceso no autorizado, uso o alteración de tus transmisiones o contenido</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">8. Juego Responsable</h2>
          <p>
            TuApuesta promueve el juego responsable. Las apuestas deben ser una forma de entretenimiento, no una fuente de ingresos. Nunca apuestes más de lo que puedes permitirte perder y establece límites de tiempo y dinero. Si crees que puedes tener un problema con el juego, busca ayuda profesional.
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">9. Cambios en los Términos</h2>
          <p>
            Nos reservamos el derecho, a nuestra sola discreción, de modificar o reemplazar estos Términos en cualquier momento. Si una revisión es material, intentaremos proporcionar un aviso de al menos 30 días antes de que los nuevos términos entren en vigor.
          </p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">10. Ley Aplicable</h2>
          <p>
            Estos términos y condiciones se rigen e interpretan de acuerdo con las leyes de España, y te sometes irrevocablemente a la jurisdicción exclusiva de los tribunales en esa ubicación.
          </p>
          
          <Separator className="my-6" />
          
          <p className="text-sm text-muted-foreground mt-8">
            Última actualización: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}