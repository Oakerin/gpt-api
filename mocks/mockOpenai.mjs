const file = {
    object: 'file',
    id: 'file-FAJL24VctuXx8RNWLdL8q4',
    purpose: 'batch',
    filename: 'batch_input.jsonl',
    bytes: 8490,
    created_at: 1736597020,
    status: 'processed',
    status_details: null
}

const batch = {
    id: 'batch_6780116e71948190a644e14ca246dd4d',
    object: 'batch',
    endpoint: '/v1/chat/completions',
    errors: null,
    input_file_id: 'file-CuhiYcVYVJpdFovaae6hHV',
    completion_window: '24h',
    status: 'completed',
    output_file_id: 'file-CBicSBtJxLHFgXLVcDzy3S',
    error_file_id: null,
    created_at: 1736446318,
    in_progress_at: 1736446319,
    expires_at: 1736532718,
    finalizing_at: 1736447738,
    completed_at: 1736447741,
    failed_at: null,
    expired_at: null,
    cancelling_at: null,
    cancelled_at: null,
    request_counts: { total: 30, completed: 30, failed: 0 },
    metadata: null
}

export const mockOpenai = {
    batches: {
        retrieve: async (id) => {
            return { ...batch, id }
        }
    }
}