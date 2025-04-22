
import { Layout } from "@/components/layout/Layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin } from "lucide-react"

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
  }

  return (
    <Layout>
      <div className="container-custom py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-4xl font-bold mb-6">Get in Touch</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Have a question or feedback? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
            </p>

            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <span>support@whimsy.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span>123 Furniture Lane, Woodwork City, WC 12345</span>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input placeholder="Your Name" required />
                </div>
                <div>
                  <Input type="email" placeholder="Your Email" required />
                </div>
                <div>
                  <Input placeholder="Subject" required />
                </div>
                <div>
                  <Textarea 
                    placeholder="Your Message" 
                    className="min-h-[150px]"
                    required 
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

export default Contact
