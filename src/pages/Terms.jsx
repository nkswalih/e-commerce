import React from "react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <img
                alt="EchOo."
                src="/src/assets/images/Echoo-transparent.png"
                className="h-8 w-auto"
              />
              <span className="ml-2 text-2xl font-light text-gray-900">
                EchOo.
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-600 hover:text-gray-900">
                Home
              </a>
              <a href="/products" className="text-gray-600 hover:text-gray-900">
                Products
              </a>
              <a href="/support" className="text-gray-600 hover:text-gray-900">
                Support
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-gray-900 mb-4">
            Terms and Conditions
          </h1>
          <p className="text-lg text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6">
              1. Introduction
            </h2>
            <p className="text-gray-700 mb-4">
              Welcome to EchOo. These Terms and Conditions govern your use of
              our website and services. By accessing or using EchOo., you agree
              to be bound by these terms.
            </p>
            <p className="text-gray-700">
              EchOo. specializes in premium smart devices including iPhones, Mac
              computers, and laptops from all major brands. Our commitment is to
              provide high-quality technology products with exceptional customer
              service.
            </p>
          </section>

          {/* Products and Services */}
          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6">
              2. Products and Services
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                We offer a wide range of smart devices and technology products
                including:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Apple iPhones and iOS devices</li>
                <li>Mac computers (MacBook, iMac, Mac Pro, Mac Studio)</li>
                <li>
                  Laptops from all major brands (Dell, HP, Lenovo, ASUS, etc.)
                </li>
                <li>Smart home devices and accessories</li>
                <li>Wearable technology and smart watches</li>
                <li>Tablets and mobile computing devices</li>
              </ul>
            </div>
          </section>

          {/* Account Registration */}
          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6">
              3. Account Registration
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                To purchase products from EchOo., you may need to create an
                account. You are responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  Maintaining the confidentiality of your account credentials
                </li>
                <li>All activities that occur under your account</li>
                <li>Providing accurate and complete information</li>
                <li>Updating your information to keep it current</li>
              </ul>
            </div>
          </section>

          {/* Orders and Payment */}
          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6">
              4. Orders and Payment
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>Pricing:</strong> All prices are shown in US dollars and
                are subject to change without notice.
              </p>
              <p>
                <strong>Order Acceptance:</strong> Your order constitutes an
                offer to purchase. We reserve the right to refuse or cancel any
                order.
              </p>
              <p>
                <strong>Payment Methods:</strong> We accept major credit cards,
                PayPal, and other payment methods as indicated during checkout.
              </p>
              <p>
                <strong>Taxes:</strong> Applicable sales tax will be added to
                your order total.
              </p>
            </div>
          </section>

          {/* Shipping and Delivery */}
          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6">
              5. Shipping and Delivery
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>Shipping Times:</strong> Estimated delivery times are
                provided during checkout and may vary.
              </p>
              <p>
                <strong>Shipping Costs:</strong> Shipping costs are calculated
                based on weight, destination, and shipping method.
              </p>
              <p>
                <strong>International Shipping:</strong> Available to select
                countries. Additional customs fees may apply.
              </p>
              <p>
                <strong>Order Tracking:</strong> Tracking information will be
                provided once your order ships.
              </p>
            </div>
          </section>

          {/* Returns and Refunds */}
          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6">
              6. Returns and Refunds
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>Return Policy:</strong> We offer a 30-day return policy
                for most items in original condition.
              </p>
              <p>
                <strong>Refund Processing:</strong> Refunds are processed within
                5-10 business days after we receive the returned item.
              </p>
              <p>
                <strong>Restocking Fee:</strong> Some items may be subject to a
                restocking fee.
              </p>
              <p>
                <strong>Defective Products:</strong> Contact us immediately if
                you receive a defective product.
              </p>
            </div>
          </section>

          {/* Warranty */}
          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6">
              7. Warranty
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>Manufacturer Warranty:</strong> Most products come with
                manufacturer warranty.
              </p>
              <p>
                <strong>Extended Warranty:</strong> Optional extended warranty
                plans may be available for purchase.
              </p>
              <p>
                <strong>Warranty Claims:</strong> Contact the manufacturer
                directly for warranty claims or our support team for assistance.
              </p>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6">
              8. Intellectual Property
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                All content on this website, including text, graphics, logos,
                and images, is the property of EchOo. or its content suppliers
                and protected by international copyright laws.
              </p>
              <p>
                Apple, iPhone, Mac, iPad, and other product names are trademarks
                of their respective owners. EchOo. is not affiliated with Apple
                Inc. or other manufacturers.
              </p>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6">
              9. Limitation of Liability
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                EchOo. shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages resulting from your
                use of or inability to use the service or products.
              </p>
              <p>
                Our total liability for any claim arising out of or relating to
                these terms shall not exceed the amount you paid for the
                products giving rise to the claim.
              </p>
            </div>
          </section>

          {/* Changes to Terms */}
          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6">
              10. Changes to Terms
            </h2>
            <p className="text-gray-700">
              We reserve the right to modify these terms at any time. We will
              notify users of significant changes by posting the new terms on
              our website. Continued use after changes constitutes acceptance of
              the modified terms.
            </p>
          </section>

          {/* Contact Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-light text-gray-900 mb-6">
              11. Contact Information
            </h2>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Customer Support:</strong> support@echoo.com
              </p>
              <p>
                <strong>Sales Inquiries:</strong> sales@echoo.com
              </p>
              <p>
                <strong>Phone:</strong> 1-800-ECHOO-00
              </p>
              <p>
                <strong>Business Hours:</strong> Monday-Friday, 9:00 AM - 6:00
                PM EST
              </p>
            </div>
          </section>

          {/* Acceptance */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-light text-gray-900 mb-4">
              Acceptance of Terms
            </h2>
            <p className="text-gray-700 mb-4">
              By using our website and purchasing our products, you acknowledge
              that you have read, understood, and agree to be bound by these
              Terms and Conditions.
            </p>
            <p className="text-sm text-gray-600">
              If you do not agree with any part of these terms, please do not
              use our website or services.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <img
                alt="EchOo."
                src="/src/assets/images/Echoo-transparent.png"
                className="h-6 w-auto"
              />
              <span className="ml-2 text-lg font-light text-gray-600">
                EchOo.
              </span>
            </div>
            <div className="flex space-x-6 text-sm text-gray-600">
              <a href="/privacy" className="hover:text-gray-900">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-gray-900">
                Terms & Conditions
              </a>
              <a href="/contact" className="hover:text-gray-900">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-4 text-center md:text-left">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} EchOo. All rights reserved. Apple and
              other product names are trademarks of their respective owners.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Terms;
