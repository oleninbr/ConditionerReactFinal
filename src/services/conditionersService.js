import apiClient from './apiClient';

/**
 * Service layer for Conditioners API
 * Encapsulates all HTTP operations for the /conditioners endpoint
 */
const conditionersService = {
  /**
   * Fetch all conditioners
   * @returns {Promise<Array>} List of conditioners
   */
  async getAll() {
    const response = await apiClient.get('/conditioners');
    return response.data;
  },

  /**
   * Fetch a single conditioner by ID
   * @param {number} id - Conditioner ID
   * @returns {Promise<Object>} Conditioner details
   */
  async getById(id) {
    const response = await apiClient.get(`/conditioners/${id}`);
    return response.data;
  },

  /**
   * Create a new conditioner
   * @param {Object} data - Conditioner data
   * @returns {Promise<Object>} Created conditioner
   */
  async create(data) {
    const response = await apiClient.post('/conditioners', data);
    return response.data;
  },

  /**
   * Update an existing conditioner
   * @param {number} id - Conditioner ID
   * @param {Object} data - Updated conditioner data
   * @returns {Promise<Object>} Updated conditioner
   */
  async update(id, data) {
    const response = await apiClient.put(`/conditioners/${id}`, data);
    return response.data;
  },

  /**
   * Delete a conditioner
   * @param {number} id - Conditioner ID
   * @returns {Promise<void>}
   */
  async delete(id) {
    await apiClient.delete(`/conditioners/${id}`);
  },
};

export default conditionersService;