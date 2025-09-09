import axios from 'axios'
import { API_CONFIG } from '@/config/api'

export interface ApplicationData {
  name: string
  email: string
  phone: string
  productCategory: string
  productTitle?: string
  description: string
}

export interface ApplicationResponse {
  id: string
  name: string
  email: string
  phone: string
  productCategory: string
  productTitle?: string
  description: string
  status: string
  createdAt: string
  updatedAt: string
}

export const applicationsApi = {
  async createApplication(data: ApplicationData): Promise<ApplicationResponse> {
    const response = await axios.post(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.APPLICATIONS}`, data)
    return response.data
  }
}
