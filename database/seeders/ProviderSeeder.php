<?php

namespace Database\Seeders;

use App\Models\Provider;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProviderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $providers = [
            ['name' => 'AI21', 'base_url' => 'https://api.ai21.com/v1'],
            ['name' => 'AionLabs', 'base_url' => 'https://api.aionlabs.com/v1'],
            ['name' => 'Alibaba', 'base_url' => 'https://api.alibaba.com/v1'],
            ['name' => 'Amazon Bedrock', 'base_url' => 'https://bedrock-runtime.amazonaws.com/v1'],
            ['name' => 'Anthropic', 'base_url' => 'https://api.anthropic.com/v1'],
            ['name' => 'Avian.io', 'base_url' => 'https://api.avian.io/v1'],
            ['name' => 'Azure', 'base_url' => 'https://api.cognitive.microsoft.com/v1'],
            ['name' => 'Chutes', 'base_url' => 'https://api.chutes.ai/v1'],
            ['name' => 'Cloudflare', 'base_url' => 'https://api.cloudflare.com/v1'],
            ['name' => 'Cohere', 'base_url' => 'https://api.cohere.ai/v1'],
            ['name' => 'Crusoe', 'base_url' => 'https://api.crusoe.ai/v1'],
            ['name' => 'DeepInfra', 'base_url' => 'https://api.deepinfra.com/v1'],
            ['name' => 'DeepSeek', 'base_url' => 'https://api.deepseek.com/v1'],
            ['name' => 'Featherless', 'base_url' => 'https://api.featherless.ai/v1'],
            ['name' => 'Fireworks', 'base_url' => 'https://api.fireworks.ai/v1'],
            ['name' => 'Friendli', 'base_url' => 'https://api.friendli.ai/v1'],
            ['name' => 'Google AI Studio', 'base_url' => 'https://ai.googleapis.com/v1'],
            ['name' => 'Google Vertex', 'base_url' => 'https://us-central1-aiplatform.googleapis.com/v1'],
            ['name' => 'Groq', 'base_url' => 'https://api.groq.com/v1'],
            ['name' => 'Hyperbolic', 'base_url' => 'https://api.hyperbolic.ai/v1'],
            ['name' => 'inference.net', 'base_url' => 'https://api.inference.net/v1'],
            ['name' => 'Infermatic', 'base_url' => 'https://api.infermatic.ai/v1'],
            ['name' => 'Inflection', 'base_url' => 'https://api.inflection.ai/v1'],
            ['name' => 'kluster.ai', 'base_url' => 'https://api.kluster.ai/v1'],
            ['name' => 'Lambda', 'base_url' => 'https://api.lambda-ai.com/v1'],
            ['name' => 'Lepton', 'base_url' => 'https://api.lepton.ai/v1'],
            ['name' => 'Liquid', 'base_url' => 'https://api.liquid.ai/v1'],
            ['name' => 'Mancer', 'base_url' => 'https://api.mancer.ai/v1'],
            ['name' => 'Minimax', 'base_url' => 'https://api.minimax.ai/v1'],
            ['name' => 'Mistral', 'base_url' => 'https://api.mistral.ai/v1'],
            ['name' => 'Nebius AI Studio', 'base_url' => 'https://api.nebius.ai/v1'],
            ['name' => 'Nineteen', 'base_url' => 'https://api.nineteen.ai/v1'],
            ['name' => 'NovitaAI', 'base_url' => 'https://api.novita.ai/v1'],
            ['name' => 'OpenAI', 'base_url' => 'https://api.openai.com/v1'],
            ['name' => 'Parasail', 'base_url' => 'https://api.parasail.ai/v1'],
            ['name' => 'Perplexity', 'base_url' => 'https://api.perplexity.ai/v1'],
            ['name' => 'SambaNova', 'base_url' => 'https://api.sambanova.ai/v1'],
            ['name' => 'SF Compute', 'base_url' => 'https://api.sfcompute.com/v1'],
            ['name' => 'Targon', 'base_url' => 'https://api.targon.ai/v1'],
            ['name' => 'Together', 'base_url' => 'https://api.together.xyz/v1'],
            ['name' => 'Ubicloud', 'base_url' => 'https://api.ubicloud.com/v1'],
            ['name' => 'xAI', 'base_url' => 'https://api.xai.com/v1'],
        ];

        foreach ($providers as $provider) {
            Provider::query()->forceCreate([
                'name' => $provider['name'],
                'slug' => Str::slug($provider['name']),
                'base_url' => $provider['base_url'],
                'is_active' => true,
            ]);
        }
    }
}
