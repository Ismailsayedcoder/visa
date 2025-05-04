// هذا مجرد مثال. في التطبيق الحقيقي، ستحتاج إلى قاعدة بيانات وإدارة جلسات آمنة
let requests = [];

export default function handler(req, res) {
  // التحقق من صحة token المشرف
  const token = req.headers.authorization;
  if (!token || token !== 'Bearer dummy-token') {
    return res.status(401).json({ message: 'غير مصرح' });
  }

  if (req.method === 'GET') {
    return res.status(200).json(requests);
  }

  if (req.method === 'POST') {
    const newRequest = {
      id: Date.now(),
      status: 'pending',
      date: new Date().toISOString(),
      ...req.body
    };
    requests.push(newRequest);
    return res.status(201).json(newRequest);
  }

  if (req.method === 'PUT') {
    const { id } = req.query;
    const index = requests.findIndex(r => r.id === parseInt(id));
    if (index === -1) {
      return res.status(404).json({ message: 'الطلب غير موجود' });
    }
    requests[index] = { ...requests[index], ...req.body };
    return res.status(200).json(requests[index]);
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
