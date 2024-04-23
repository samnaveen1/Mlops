import json
from django.http import JsonResponse
import pickle

model_path = "C:/Users/Samnaveen.AB/Downloads/diabetes_model.pkl"

def predict(request):
    if request.method == 'POST':
        x_features = json.loads(request.POST.get('xFeatures'))

        # Load the model
        try:
            with open(model_path, 'rb') as f:
                model = pickle.load(f)
        except FileNotFoundError:
            return JsonResponse({'error': 'Model file not found'}, status=500)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

        # Perform prediction using the loaded model
        try:
            prediction = model.predict([list(x_features.values())])
            return JsonResponse({'prediction': prediction.tolist()})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Method not allowed'}, status=405)
